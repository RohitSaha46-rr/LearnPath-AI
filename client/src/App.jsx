import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RoadmapPage from './pages/RoadmapPage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }></Route>
      <Route path='/roadmap' element={
        <PrivateRoute>
          <RoadmapPage />
        </PrivateRoute>
      }></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
