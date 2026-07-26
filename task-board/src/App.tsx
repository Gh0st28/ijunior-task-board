import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ServiceOrders from './pages/ServiceOrders'

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
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/service-orders" element={<ServiceOrders />} />
      </Route>
    </Routes>
  )
}