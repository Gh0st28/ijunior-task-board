import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ServiceOrders from './pages/ServiceOrders'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'

function Layout() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route path='/' element={<Dashboard />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/service-orders' element={<ServiceOrders />} />
      </Route>
      <Route path="*" element={<Navigate to='/' replace />} />
    </Routes>
  )
}