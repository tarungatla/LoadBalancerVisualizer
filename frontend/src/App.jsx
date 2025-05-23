import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Request from './pages/Request'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
