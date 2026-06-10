import { useState, useRef, useEffect } from 'react'

// Graba audio de la conversación con el paciente usando MediaRecorder.
// Permite grabar / pausar / detener, reproducir y descargar el .webm.
function AudioRecorder({ patientName = 'paciente' }) {
  const [status, setStatus] = useState('idle') // idle | recording | paused | stopped
  const [audioUrl, setAudioUrl] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState(null)

  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)
  const timerRef = useRef(null)

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      stopTimer()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
  }
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const formatTime = (total) => {
    const m = String(Math.floor(total / 60)).padStart(2, '0')
    const s = String(total % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const startRecording = async () => {
    setError(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioUrl(URL.createObjectURL(blob))
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop())
          streamRef.current = null
        }
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setSeconds(0)
      setStatus('recording')
      startTimer()
    } catch (err) {
      console.error('Mic error:', err)
      setError('No se pudo acceder al micrófono. Revise los permisos del navegador.')
    }
  }

  const pauseRecording = () => {
    const r = mediaRecorderRef.current
    if (r && r.state === 'recording') {
      r.pause()
      stopTimer()
      setStatus('paused')
    }
  }

  const resumeRecording = () => {
    const r = mediaRecorderRef.current
    if (r && r.state === 'paused') {
      r.resume()
      startTimer()
      setStatus('recording')
    }
  }

  const stopRecording = () => {
    const r = mediaRecorderRef.current
    if (r && r.state !== 'inactive') {
      r.stop()
    }
    stopTimer()
    setStatus('stopped')
  }

  const fileName = `conversacion-${String(patientName).replace(/\s+/g, '_').toLowerCase()}.webm`

  return (
    <div className="audio-recorder">
      <div className="audio-recorder-header">
        <span className="audio-recorder-title">🎙️ Grabación de la conversación</span>
        {(status === 'recording' || status === 'paused') && (
          <span className={`audio-timer ${status === 'recording' ? 'is-live' : ''}`}>
            {status === 'recording' && <span className="rec-dot" />}
            {formatTime(seconds)}
          </span>
        )}
      </div>

      {error && <div className="audio-error">{error}</div>}

      <div className="audio-controls">
        {status === 'idle' || status === 'stopped' ? (
          <button type="button" className="audio-btn audio-btn-record" onClick={startRecording}>
            {status === 'stopped' ? 'Grabar de nuevo' : 'Iniciar grabación'}
          </button>
        ) : null}

        {status === 'recording' && (
          <>
            <button type="button" className="audio-btn audio-btn-pause" onClick={pauseRecording}>
              Pausar
            </button>
            <button type="button" className="audio-btn audio-btn-stop" onClick={stopRecording}>
              Detener
            </button>
          </>
        )}

        {status === 'paused' && (
          <>
            <button type="button" className="audio-btn audio-btn-record" onClick={resumeRecording}>
              Reanudar
            </button>
            <button type="button" className="audio-btn audio-btn-stop" onClick={stopRecording}>
              Detener
            </button>
          </>
        )}
      </div>

      {audioUrl && status === 'stopped' && (
        <div className="audio-playback">
          <audio controls src={audioUrl} style={{ width: '100%' }} />
          <a className="audio-btn audio-btn-download" href={audioUrl} download={fileName}>
            ⬇ Descargar audio
          </a>
        </div>
      )}
    </div>
  )
}

export default AudioRecorder
