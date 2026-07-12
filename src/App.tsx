import { useState } from "react";
import { OrdemDeServico, Status } from "./types";
import Header from "./components/Header";
import OrdemCard from "./components/OrdemCard"
import FormNovaOrdem from "./components/FormNovaOrdem"

export default function App() {
  const [ordens, setOrdens] = useState<OrdemDeServico[]>([]);
  
  function adicionarOrdem(nova: OrdemDeServico) {
    setOrdens((prev) => [nova, ...prev]);
  }

  function mudarStatus(id: number, novoStatus: Status) {
    setOrdens((prev) => prev.map((o) => (o.id === id ? { ...o, status: novoStatus } : o)));
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <FormNovaOrdem onAdicionar={adicionarOrdem} />
        {ordens.length === 0 ? (
          <p className="text-zinc-500 text-center text-sm">
            Sem ordens ainda
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ordens.map((ordem) => (
              <OrdemCard
                key={ordem.id}
                ordem={ordem}
                onMudarStatus={mudarStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
