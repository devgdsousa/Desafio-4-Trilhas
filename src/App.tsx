import Home from './pages/home'
import DashBoard from './pages/dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  )
}

export default App
