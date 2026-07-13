//Header da página, estático.

export default function Header() {
    return (
        <header className="bg-zinc-900 border-b border-zinc-700 px-6 py-4">
            <h1 className="text-white text-2xl font-bold tracking-tight">ijunior Task Board</h1>
            <p className="text-zinc-400 text-sm">Gerenciamento de ordens de serviço</p>
        </header>
    )
}