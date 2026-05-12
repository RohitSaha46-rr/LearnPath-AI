import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RoadmapPage from './pages/RoadmapPage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { lazy, Suspense } from "react";

const PaymentApp = lazy(() => import("Payment_MFE/PaymentApp"));

function App() {
  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
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
      {/* <Route path='/payment/*' element={
        <PrivateRoute>
          <PaymentApp />
        </PrivateRoute>
      }></Route> */}
      <Route path='/payment' element={<PaymentApp />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
