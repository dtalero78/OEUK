import { useRef, useState } from 'react'

function PhotoCapture({ onSave, initialValue }) {
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
      alert('Could not access camera. Please use file upload instead.')
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
              Take Photo
            </button>
            <button type="button" className="wizard-btn wizard-btn-secondary" onClick={stopCamera}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {preview ? (
            <div className="photo-preview">
              <img src={preview} alt="Preview" />
              <button type="button" className="wizard-btn wizard-btn-secondary" onClick={clearPhoto}>
                Remove
              </button>
            </div>
          ) : (
            <div className="photo-options">
              <button type="button" className="wizard-btn wizard-btn-primary" onClick={startCamera}>
                Take Photo
              </button>
              <span className="photo-or">or</span>
              <button type="button" className="wizard-btn wizard-btn-secondary" onClick={() => fileInputRef.current.click()}>
                Upload File
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
