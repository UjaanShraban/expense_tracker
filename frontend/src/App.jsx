import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from '../components/Home'
import History from '../components/History'
import Form from '../components/Form'
import Navbar from '../components/navbar'

const App = () => {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
    </div>
  )
}

export default App
