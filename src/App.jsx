import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import V0Page from './pages/v0'
import V1Page from './pages/v1'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/0" replace />} />
        <Route path="/0" element={<V0Page />} />
        <Route path="/1" element={<V1Page />} />
      </Routes>
    </Router>
  )
}

export default App
