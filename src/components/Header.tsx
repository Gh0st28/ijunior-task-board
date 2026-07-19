import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header classname="bg-zinc-900 border-b border-zinc-700 px-6 py-4 flex items-center justify-between">
            <div>
                <h1 className="text-white text-2xl font-bold">
                    iTask Board
                </h1>
                <p className="text-zinc-400 text-sm">
                    Gerenciamento de ordens de serviço
                </p>
            </div>
            <nav className="flex gap-4">
                <Link to="/" className="text-zinc-300 hover:text-white text-sm transition-colors">
                    Dashboard
                </Link>
                <Link to="/Clients" className="text-zinc-300 hover:text-white text-sm transition-colors">
                    Clientes
                </Link>
                <Link to="/service-orders" className="text-zinc-300 hover:text-white text-sm transition-colors">
                    Ordens
                </Link>
            </nav>
        </header>
    )
}