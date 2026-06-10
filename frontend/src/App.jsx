import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientForm from './pages/PatientForm'
import DoctorPanel from './pages/DoctorPanel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientForm />} />
        <Route path="/doctor" element={<DoctorPanel />} />
      </Routes>
    </Router>
  )
}

export default App
