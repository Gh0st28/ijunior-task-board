import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ServiceOrders from './pages/ServiceOrders'

export default function App() {
  return (
    <div ClassName="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/service-orders" element={<ServiceOrders />} />
        </Routes>
      </main>
    </div>
  )
}