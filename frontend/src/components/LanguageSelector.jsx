import { useState } from 'react'
import { getTranslation } from '../i18n/translations'
import logo from '../assets/logoOEUK.png'

function LanguageSelector({ onLanguageSelect }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleSelect = (lang) => {
    setSelectedLanguage(lang)
  }

  const handleContinue = () => {
    if (selectedLanguage) {
      onLanguageSelect(selectedLanguage)
    }
  }

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <img src={logo} alt="OEUK" className="wizard-logo" />
        <p className="wizard-subtitle">OGUK/OEUK Certified Occupational Physician</p>
        <p className="wizard-subtitle">Médico Ocupacional Certificado OGUK/OEUK</p>
        <p className="wizard-contact">+57 316 525 9075</p>
      </div>

      <div className="wizard-content">
        <div className="wizard-question">
          <h2>Select Language / Seleccione Idioma</h2>

          <div className="wizard-radio-group">
            <div
              className={`wizard-radio-option ${selectedLanguage === 'en' ? 'selected' : ''}`}
              onClick={() => handleSelect('en')}
            >
              <input
                type="radio"
                name="language"
                value="en"
                checked={selectedLanguage === 'en'}
                onChange={() => handleSelect('en')}
              />
              <label>English</label>
            </div>

            <div
              className={`wizard-radio-option ${selectedLanguage === 'es' ? 'selected' : ''}`}
              onClick={() => handleSelect('es')}
            >
              <input
                type="radio"
                name="language"
                value="es"
                checked={selectedLanguage === 'es'}
                onChange={() => handleSelect('es')}
              />
              <label>Español</label>
            </div>
          </div>

          <div className="wizard-buttons">
            <button
              className="wizard-btn wizard-btn-primary"
              onClick={handleContinue}
              disabled={!selectedLanguage}
            >
              {selectedLanguage === 'es' ? 'Continuar' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
