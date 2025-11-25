import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3000/api'

function RecordDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [physicianComments, setPhysicianComments] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchRecord()
  }, [id])

  const fetchRecord = async () => {
    try {
      const response = await fetch(`${API_URL}/medical-records/${id}`)
      const data = await response.json()

      if (data.success) {
        setRecord(data.record)
        setPhysicianComments(data.record.physician_comments || '')
      } else {
        setError('Record not found')
      }
    } catch (err) {
      setError('Error fetching record')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveComments = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const response = await fetch(`${API_URL}/medical-records/${id}/physician-comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ physician_comments: physicianComments })
      })

      const data = await response.json()

      if (data.success) {
        setSaved(true)
        fetchRecord()
      } else {
        setError('Error saving comments')
      }
    } catch (err) {
      setError('Error saving comments')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const renderQuestion = (number, question, answer, comment) => (
    <div className="question-block" style={{ marginBottom: '15px' }}>
      <h3>{number}. {question}</h3>
      <p><strong>Answer:</strong> {answer || 'Not answered'}</p>
      {comment && <p><strong>Comment:</strong> {comment}</p>}
    </div>
  )

  if (loading) {
    return <div className="loading">Loading record...</div>
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-error">
          {error}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/doctor')}>
          Back to Records
        </button>
      </div>
    )
  }

  if (!record) {
    return <div className="loading">Record not found</div>
  }

  return (
    <div>
      <button className="btn btn-secondary" onClick={() => navigate('/doctor')} style={{ marginBottom: '20px' }}>
        ← Back to Records
      </button>

      <div className="card">
        <h2>Medical Record Details</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span className={`badge ${record.reviewed ? 'badge-reviewed' : 'badge-pending'}`}>
            {record.reviewed ? 'Reviewed' : 'Pending Review'}
          </span>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Submitted: {formatDate(record.created_at)}
          </p>
        </div>

        <h3 style={{ marginTop: '20px', marginBottom: '15px', color: '#2c3e50' }}>
          Personal Information
        </h3>

        <div className="grid-2">
          <p><strong>Surname:</strong> {record.surname}</p>
          <p><strong>Forenames:</strong> {record.forenames}</p>
          <p><strong>Date of Birth:</strong> {formatDate(record.date_of_birth)}</p>
          <p><strong>Tel No:</strong> {record.tel_no || 'N/A'}</p>
        </div>

        <p style={{ marginTop: '10px' }}><strong>Address:</strong> {record.address || 'N/A'}</p>

        <div className="grid-2" style={{ marginTop: '10px' }}>
          <p><strong>GP's Name:</strong> {record.gp_name || 'N/A'}</p>
          <p><strong>Last Offshore Medical:</strong> {formatDate(record.date_last_offshore_medical)}</p>
        </div>

        <p style={{ marginTop: '10px' }}><strong>GP's Address:</strong> {record.gp_address || 'N/A'}</p>

        <div className="grid-2" style={{ marginTop: '10px' }}>
          <p><strong>Offshore Occupation:</strong> {record.offshore_occupation || 'N/A'}</p>
          <p><strong>Emergency Response Role:</strong> {record.emergency_response_role || 'N/A'}</p>
        </div>

        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>
          Social History / Occupation
        </h3>

        {renderQuestion(
          1,
          'Do you smoke? If so, how many per day?',
          record.q1_smoke,
          record.q1_comment
        )}

        {renderQuestion(
          2,
          'If an ex smoker, when did you give up?',
          record.q2_ex_smoker,
          record.q2_comment
        )}

        {renderQuestion(
          3,
          'Average weekly alcohol consumption: state quantity and type.',
          record.q3_alcohol,
          record.q3_comment
        )}

        {renderQuestion(
          4,
          'Have you ever been exposed to any known occupational hazard such as noise, radiation, dusts, asbestos, chemicals or lead?',
          record.q4_occupational_hazard,
          record.q4_comment
        )}

        {renderQuestion(
          5,
          'Do you use protective clothing, safety glasses or hearing protection?',
          record.q5_protective_equipment,
          record.q5_comment
        )}

        {renderQuestion(
          6,
          'Have you developed any medical condition in connection with your occupation?',
          record.q6_medical_condition,
          record.q6_comment
        )}

        {renderQuestion(
          7,
          'Have you ever suffered any industrial injury?',
          record.q7_industrial_injury,
          record.q7_comment
        )}

        {renderQuestion(
          8,
          'Have you ever had any previous audiometric screening?',
          record.q8_audiometric_screening,
          record.q8_comment
        )}

        {renderQuestion(
          9,
          'Have you ever had previous lung function screening?',
          record.q9_lung_function_screening,
          record.q9_comment
        )}

        {renderQuestion(
          10,
          'Have you ever been rejected from employment on medical grounds?',
          record.q10_rejected_employment,
          record.q10_comment
        )}

        {renderQuestion(
          11,
          'Have you ever received compensation or is there any industrial claim pending?',
          record.q11_compensation,
          record.q11_comment
        )}

        {renderQuestion(
          12,
          'Have you ever been medivaced from an offshore installation?',
          record.q12_medivaced,
          record.q12_comment
        )}

        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>
          Examining Physician's Comments
        </h3>

        {saved && (
          <div className="alert alert-success">
            Comments saved successfully!
          </div>
        )}

        <div className="form-group">
          <textarea
            value={physicianComments}
            onChange={(e) => setPhysicianComments(e.target.value)}
            placeholder="Enter your medical examination comments here..."
            style={{ minHeight: '150px' }}
          />
        </div>

        <button
          className="btn btn-success"
          onClick={handleSaveComments}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Comments & Mark as Reviewed'}
        </button>

        {record.reviewed_at && (
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            Last reviewed: {formatDate(record.reviewed_at)}
          </p>
        )}
      </div>
    </div>
  )
}

export default RecordDetail
