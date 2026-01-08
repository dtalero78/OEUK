import { useRef, useState } from 'react'
import { getTranslation } from '../i18n/translations'

function PhotoCapture({ onSave, initialValue, language = 'en' }) {
  const t = (key) => getTranslation(language, key)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const [preview, setPreview] = useState(initialValue || '')
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onSave(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      })
      videoRef.current.srcObject = mediaStream
      setStream(mediaStream)
      setShowCamera(true)
    } catch (err) {
      alert(t('photoCapture.errorCamera'))
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
    setPreview(dataUrl)
    onSave(dataUrl)
    stopCamera()
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const clearPhoto = () => {
    setPreview('')
    onSave('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="photo-container">
      {showCamera ? (
        <div className="camera-view">
          <video ref={videoRef} autoPlay playsInline className="camera-video" />
          <div className="camera-actions">
            <button type="button" className="wizard-btn wizard-btn-primary" onClick={capturePhoto}>
              {t('photoCapture.takePhoto')}
            </button>
            <button type="button" className="wizard-btn wizard-btn-secondary" onClick={stopCamera}>
              {t('photoCapture.cancel')}
            </button>
          </div>
        </div>
      ) : (
        <>
          {preview ? (
            <div className="photo-preview">
              <img src={preview} alt="Preview" />
              <button type="button" className="wizard-btn wizard-btn-secondary" onClick={clearPhoto}>
                {t('photoCapture.remove')}
              </button>
            </div>
          ) : (
            <div className="photo-options">
              <button type="button" className="wizard-btn wizard-btn-primary" onClick={startCamera}>
                {t('photoCapture.takePhoto')}
              </button>
              <span className="photo-or">{t('photoCapture.or')}</span>
              <button type="button" className="wizard-btn wizard-btn-secondary" onClick={() => fileInputRef.current.click()}>
                {t('photoCapture.uploadFile')}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PhotoCapture
