import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3000/api'

function DoctorPanel() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      fetchRecords()
    }
  }, [authenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch(`${API_URL}/auth/doctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.authenticated) {
        setAuthenticated(true)
        setPassword('')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error('Error:', err)
    }
  }

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/medical-records`)
      const data = await response.json()

      if (data.success) {
        setRecords(data.records)
      }
    } catch (err) {
      setError('Error fetching records')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  if (!authenticated) {
    return (
      <div className="card login-form">
        <h2>Doctor Panel Login</h2>
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          Default password: oeuk2024
        </p>
      </div>
    )
  }

  if (loading) {
    return <div className="loading">Loading records...</div>
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Medical Records</h2>
        <button
          className="btn btn-secondary"
          onClick={() => setAuthenticated(false)}
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Occupation</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.forenames} {record.surname}</td>
                <td>{formatDate(record.date_of_birth)}</td>
                <td>{record.offshore_occupation || 'N/A'}</td>
                <td>{formatDate(record.created_at)}</td>
                <td>
                  <span className={`badge ${record.reviewed ? 'badge-reviewed' : 'badge-pending'}`}>
                    {record.reviewed ? 'Reviewed' : 'Pending'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '14px' }}
                    onClick={() => navigate(`/doctor/record/${record.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DoctorPanel
