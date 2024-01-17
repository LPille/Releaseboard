import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReleaseOverview } from './pages/ReleaseOverview'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/Releaseboard" element={<ReleaseOverview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
