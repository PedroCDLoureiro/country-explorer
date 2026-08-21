import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:id" element={<CountryDetails />} />
    </Routes>
  )
}

export default App