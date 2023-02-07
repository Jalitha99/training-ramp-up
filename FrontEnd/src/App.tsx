import React from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import * as io from 'socket.io-client'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/Error'
import RequireAuth from './utils/RequireAuth'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<RequireAuth element={<Home />} />} />
        <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path='/' element = {<SignIn/>}/> 
        <Route path='/SignUp' element = {<SignUp/>}/>
        <Route element={<RequireAuth element={<Home/>}/>}>  */}
          {/* <Route path='/Home' element = {<Home/>}/> */}
          {/* </Route> */}

          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          {/* <Route path='/home' element = {<Home/>}/> */}
          <Route path='*' element={<ErrorPage />} />

          <Route element={<RequireAuth />}>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<SignIn />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
