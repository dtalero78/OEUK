import { useState, useEffect } from 'react'
import RecordModal from '../components/RecordModal'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api'

function DoctorPanel() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/medical-records`)
      const data = await res.json()
      if (data.success) {
        setRecords(data.records)
      } else {
        setError('No se pudieron cargar los registros.')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  const openRecord = async (id) => {
    // Trae el registro completo (la lista ya incluye todo, pero garantizamos datos frescos)
    try {
      const res = await fetch(`${API_URL}/medical-records/${id}`)
      const data = await res.json()
      if (data.success) setSelected(data.record)
    } catch (err) {
      console.error('Error abriendo registro:', err)
    }
  }

  const formatDate = (value) => {
    if (!value) return '—'
    const d = new Date(value)
    if (isNaN(d.getTime())) return value
    return d.toLocaleDateString('es-CO')
  }

  return (
    <div className="doctor-page">
      <header className="doctor-header">
        <div>
          <h1>Panel del médico</h1>
          <p>Juan José Reátiga, MD · Registros de tamizaje OEUK</p>
        </div>
        <button className="doctor-refresh" onClick={fetchRecords} disabled={loading}>
          ↻ Actualizar
        </button>
      </header>

      <div className="doctor-content">
        {error && <div className="doctor-alert">{error}</div>}

        {loading ? (
          <div className="doctor-loading">Cargando registros...</div>
        ) : records.length === 0 ? (
          <div className="doctor-loading">No hay registros todavía.</div>
        ) : (
          <div className="doctor-table-wrap">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Paciente</th>
                  <th>Identificación</th>
                  <th>Ciudad</th>
                  <th>Empleador</th>
                  <th>Fecha examen</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="doctor-row" onClick={() => openRecord(r.id)}>
                    <td>{r.id}</td>
                    <td className="cell-name">{`${r.first_name || ''} ${r.surname || ''}`.trim() || '—'}</td>
                    <td>{r.id_number || '—'}</td>
                    <td>{r.city || '—'}</td>
                    <td>{r.current_employer || '—'}</td>
                    <td>{formatDate(r.exam_date)}</td>
                    <td>
                      <span className={`badge ${r.reviewed ? 'badge-reviewed' : 'badge-pending'}`}>
                        {r.reviewed ? 'Revisado' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <RecordModal
          record={selected}
          onClose={() => {
            setSelected(null)
            fetchRecords()
          }}
        />
      )}
    </div>
  )
}

export default DoctorPanel
