import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import AddMeeting from './assets/pages/AddMeeting'
import Error from './assets/pages/Error'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddMeeting/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  )
}

export default App
