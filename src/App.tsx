import { useState } from "react";
import { OrdemDeServico, Status } from "./types";
import Header from "./components/Header";
import OrdemCard from "./components/OrdemCard"
import FormNovaOrdem from "./components/FormNovaOrdem"

export default function App() {

  //Atribuição inicial de valores de acordo com OrdemDeServico
  const [ordens, setOrdens] = useState<OrdemDeServico[]>([]);
  
  //Recebimento de nova ordem e atualização da lista de ordens
  function adicionarOrdem(nova: OrdemDeServico) {
    setOrdens((prev) => [nova, ...prev]);
  }

  //Passagem pela lista de ordens para atualização de status caso id correspondente seja encontrado
  function mudarStatus(id: number, novoStatus: Status) {
    setOrdens((prev) => prev.map((o) => (o.id === id ? { ...o, status: novoStatus } : o)));
  }

  //Construção da página
  return (
    <div className="min-h-screen bg-zinc-900">

      //Header da página
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        
        //Form para criação de novas ordens
        <FormNovaOrdem onAdicionar={adicionarOrdem} />
        
        //Listagem de ordens
        {ordens.length === 0 ? (

          //Texto caso não tenham ordens ainda
          <p className="text-zinc-500 text-center text-sm">
            Sem ordens ainda
          </p>
        ) : (

          //Listagem das ordens quando existir ao menos uma
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
