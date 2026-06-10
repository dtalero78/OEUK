import { useState, useEffect } from 'react'
import { getQuestionSteps } from '../questionsConfig'
import { getTranslation } from '../i18n/translations'
import AudioRecorder from './AudioRecorder'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api'

const isEmpty = (v) => v === null || v === undefined || v === '' || v === false

const formatDate = (value) => {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return value
  return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Preguntas en español + equivalentes en inglés (mismas opciones, mismo índice)
const stepsEs = getQuestionSteps('es')
const stepsEn = getQuestionSteps('en')
const enById = {}
stepsEn.forEach((s) => { enById[s.id] = s })

const YES = { en: getTranslation('en', 'yes'), es: getTranslation('es', 'yes') }
const NO = { en: getTranslation('en', 'no'), es: getTranslation('es', 'no') }

// Traduce una respuesta de opción al español, sin importar el idioma en que la respondió el paciente.
// El texto libre (nombres, descripciones) se devuelve tal cual.
function translateValue(stepEs, raw) {
  if (raw === null || raw === undefined) return raw
  const value = String(raw)
  const stepEn = enById[stepEs.id]

  if (stepEs.type === 'yesno') {
    if (value === YES.en || value === YES.es) return YES.es
    if (value === NO.en || value === NO.es) return NO.es
    return value
  }

  if (stepEs.options && stepEn && stepEn.options) {
    let idx = stepEn.options.indexOf(value)
    if (idx === -1) idx = stepEs.options.indexOf(value)
    if (idx >= 0) return stepEs.options[idx]
  }
  return value
}

function renderAnswer(stepEs, record) {
  if (stepEs.type === 'checkbox-group') {
    const selected = (stepEs.fields || [])
      .map((f, i) => (record[f] ? stepEs.labels?.[i] || f : null))
      .filter(Boolean)
    return selected.length ? selected.join(', ') : '—'
  }

  const value = record[stepEs.field]
  if (isEmpty(value)) return '—'
  if (stepEs.type === 'date') return formatDate(value)
  return translateValue(stepEs, value)
}

function RecordModal({ record, onClose }) {
  const [comments, setComments] = useState(record.physician_comments || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Agrupar preguntas por sección (en español), excluyendo foto/firma
  const sections = []
  for (const step of stepsEs) {
    if (step.type === 'photo' || step.type === 'signature') continue
    let group = sections.find((s) => s.section === step.section)
    if (!group) {
      group = { section: step.section, items: [] }
      sections.push(group)
    }
    group.items.push(step)
  }

  const fullName = `${record.first_name || ''} ${record.surname || ''}`.trim() || `Registro #${record.id}`

  // Tipo de documento traducido para el encabezado
  const idTypeStep = stepsEs.find((s) => s.field === 'id_type')
  const idTypeEs = record.id_type ? translateValue(idTypeStep, record.id_type) : ''

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch(`${API_URL}/medical-records/${record.id}/physician-comments`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ physician_comments: comments }),
      })
      const data = await res.json()
      if (data.success) setSaved(true)
    } catch (err) {
      console.error('Error guardando comentarios:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{fullName}</h2>
            <p className="modal-subtitle">
              {idTypeEs ? `${idTypeEs}: ` : ''}{record.id_number || '—'} · Registro #{record.id}
              {' · '}
              <span className={`badge ${record.reviewed ? 'badge-reviewed' : 'badge-pending'}`}>
                {record.reviewed ? 'Revisado' : 'Pendiente'}
              </span>
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        </div>

        <div className="modal-body">
          <AudioRecorder patientName={fullName} />

          {(record.photo_base64 || record.signature_base64) && (
            <div className="modal-media">
              {record.photo_base64 && (
                <div className="modal-media-item">
                  <span className="answer-label">Fotografía</span>
                  <img src={record.photo_base64} alt="Foto del paciente" className="modal-photo" />
                </div>
              )}
              {record.signature_base64 && (
                <div className="modal-media-item">
                  <span className="answer-label">Firma</span>
                  <img src={record.signature_base64} alt="Firma del paciente" className="modal-signature" />
                </div>
              )}
            </div>
          )}

          {sections.map((group) => (
            <section key={group.section} className="modal-section">
              <h3 className="modal-section-title">{group.section}</h3>
              <div className="answer-list">
                {group.items.map((step) => (
                  <div className="answer-row" key={step.id}>
                    <div className="answer-question">{step.question}</div>
                    <div className="answer-value">{renderAnswer(step, record)}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="modal-section">
            <h3 className="modal-section-title">Comentarios del médico examinador</h3>
            <textarea
              className="modal-comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Escriba aquí sus observaciones de la valoración médica..."
            />
            <div className="modal-comments-actions">
              <button className="audio-btn audio-btn-download" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar y marcar como revisado'}
              </button>
              {saved && <span className="save-ok">✓ Guardado</span>}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RecordModal
