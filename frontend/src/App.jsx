import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PatientForm from './pages/PatientForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientForm />} />
      </Routes>
    </Router>
  )
}

export default App
