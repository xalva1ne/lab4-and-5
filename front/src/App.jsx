import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Header from './Header'

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
