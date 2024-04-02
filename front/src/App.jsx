import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './components/pages/Home/Home'
import Products from './components/pages/Products/Products'
import Categories from './components/pages/Categories/Categories'
import History from './components/pages/History/History'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/History" element={<History />} />
      </Routes>
    </Router>
  )
}

export default App
