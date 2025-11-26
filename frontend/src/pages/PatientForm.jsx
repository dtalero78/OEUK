import { useState } from 'react'
import { questionSteps, initialFormData } from '../questionsConfig'
import SignaturePad from '../components/SignaturePad'
import PhotoCapture from '../components/PhotoCapture'
import Tooltip from '../components/Tooltip'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api'

function PatientForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(initialFormData)

  const currentQuestion = questionSteps[currentStep]

  const getVisibleQuestionsCount = () => {
    return questionSteps.filter(q => !q.showIf || q.showIf(formData)).length
  }

  const getCurrentVisibleIndex = () => {
    let count = 0
    for (let i = 0; i <= currentStep; i++) {
      const question = questionSteps[i]
      if (!question.showIf || question.showIf(formData)) {
        count++
      }
    }
    return count
  }

  const progress = (getCurrentVisibleIndex() / getVisibleQuestionsCount()) * 100

  const handleChange = (field, value, autoAdvance = false) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    if (autoAdvance) {
      setTimeout(() => {
        const nextStep = getNextVisibleStep(currentStep)
        if (nextStep !== -1) {
          setCurrentStep(nextStep)
        } else {
          handleSubmit()
        }
      }, 300)
    }
  }

  const handleNumberChange = (field, value) => {
    // Solo permite dígitos
    const numericValue = value.replace(/[^0-9]/g, '')
    handleChange(field, numericValue)
  }

  const handleCheckboxGroupChange = (field, checked) => {
    setFormData(prev => ({ ...prev, [field]: checked }))
  }

  const canGoNext = () => {
    if (currentQuestion.required) {
      return formData[currentQuestion.field] !== ''
    }
    return true
  }

  const getNextVisibleStep = (fromStep) => {
    for (let i = fromStep + 1; i < questionSteps.length; i++) {
      const question = questionSteps[i]
      if (!question.showIf || question.showIf(formData)) {
        return i
      }
    }
    return -1
  }

  const getPreviousVisibleStep = (fromStep) => {
    for (let i = fromStep - 1; i >= 0; i--) {
      const question = questionSteps[i]
      if (!question.showIf || question.showIf(formData)) {
        return i
      }
    }
    return -1
  }

  const handleNext = () => {
    const nextStep = getNextVisibleStep(currentStep)
    if (nextStep !== -1) {
      setCurrentStep(nextStep)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    const prevStep = getPreviousVisibleStep(currentStep)
    if (prevStep !== -1) {
      setCurrentStep(prevStep)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    try {
      const response = await fetch(`${API_URL}/medical-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Error submitting form. Please try again.')
      }
    } catch (err) {
      setError('Error connecting to server. Please try again.')
      console.error('Error:', err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentQuestion.type !== 'textarea' && canGoNext()) {
      e.preventDefault()
      handleNext()
    }
  }

  if (submitted) {
    return (
      <div className="wizard-container">
        <div className="wizard-header">
          <h1>Juan José Reátiga, MD</h1>
          <p className="wizard-subtitle">OGUK/OEUK Certified Occupational Physician</p>
          <p className="wizard-contact">+57 316 525 9075</p>
        </div>
        <div className="wizard-content">
          <div className="wizard-success">
            <div className="wizard-success-icon">
              <svg viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2>Thank you!</h2>
            <p>Your medical questionnaire has been submitted successfully.</p>
            <button className="wizard-btn wizard-btn-primary" onClick={() => { setSubmitted(false); setCurrentStep(0); setFormData(initialFormData) }}>
              Submit Another Form
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderInput = () => {
    const { type, field, placeholder, options, fields, labels } = currentQuestion

    switch(type) {
      case 'text':
        return <input type="text" className="wizard-input" value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholder} autoFocus />

      case 'number':
        return <input type="text" inputMode="numeric" pattern="[0-9]*" className="wizard-input" value={formData[field] || ''} onChange={(e) => handleNumberChange(field, e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholder} autoFocus />
      
      case 'date':
        return <input type="date" className="wizard-input" value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value)} autoFocus />
      
      case 'textarea':
        return <textarea className="wizard-input wizard-textarea" value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value)} placeholder={placeholder} autoFocus />
      
      case 'select':
        return (
          <select className="wizard-select" value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value, true)} autoFocus>
            <option value="">Select an option</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )
      
      case 'radio':
        return (
          <div className="wizard-radio-group">
            {options.map(opt => (
              <div key={opt} className={`wizard-radio-option ${formData[field] === opt ? 'selected' : ''}`} onClick={() => handleChange(field, opt, true)}>
                <input type="radio" name={field} value={opt} checked={formData[field] === opt} onChange={(e) => handleChange(field, e.target.value, true)} />
                <label>{opt}</label>
              </div>
            ))}
          </div>
        )
      
      case 'yesno':
        return (
          <div className="wizard-radio-group">
            {['Yes', 'No'].map(opt => (
              <div key={opt} className={`wizard-radio-option ${formData[field] === opt ? 'selected' : ''}`} onClick={() => handleChange(field, opt, true)}>
                <input type="radio" name={field} value={opt} checked={formData[field] === opt} onChange={(e) => handleChange(field, e.target.value, true)} />
                <label>{opt}</label>
              </div>
            ))}
          </div>
        )
      
      case 'checkbox-group':
        return (
          <div className="wizard-radio-group">
            {fields.map((fld, idx) => (
              <div key={fld} className={`wizard-radio-option ${formData[fld] ? 'selected' : ''}`} onClick={() => handleCheckboxGroupChange(fld, !formData[fld])}>
                <input type="checkbox" checked={formData[fld] || false} onChange={(e) => handleCheckboxGroupChange(fld, e.target.checked)} />
                <label>{labels[idx]}</label>
              </div>
            ))}
          </div>
        )

      case 'signature':
        return (
          <SignaturePad
            onSave={(data) => handleChange(field, data)}
            initialValue={formData[field]}
          />
        )

      case 'photo':
        return (
          <PhotoCapture
            onSave={(data) => handleChange(field, data)}
            initialValue={formData[field]}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <h1>Juan José Reátiga, MD</h1>
        <p className="wizard-subtitle">OGUK/OEUK Certified Occupational Physician</p>
        <p className="wizard-contact">+57 316 525 9075</p>
      </div>

      <div className="wizard-progress">
        <div className="wizard-progress-text">
          {getCurrentVisibleIndex()} → {getVisibleQuestionsCount()} | {currentQuestion.section.toUpperCase()}: {currentQuestion.id.toUpperCase()}
        </div>
        <div className="wizard-progress-bar">
          <div className="wizard-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="wizard-content">
        <div className="wizard-question">
          <h2>
            {currentQuestion.question}
            {currentQuestion.required && <span className="required">*</span>}
            {currentQuestion.tooltip && <Tooltip text={currentQuestion.tooltip} />}
          </h2>

          {error && <div className="wizard-error">{error}</div>}

          {renderInput()}

          <div className="wizard-buttons">
            {getPreviousVisibleStep(currentStep) !== -1 && (
              <button className="wizard-btn wizard-btn-secondary" onClick={handleBack}>Back</button>
            )}
            <button className="wizard-btn wizard-btn-primary" onClick={handleNext} disabled={!canGoNext()}>
              {getNextVisibleStep(currentStep) === -1 ? 'Submit' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientForm
