import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

// Tipo para os dados de chat
type Chat = {
  id: string
  titulo: string
  materia: string
  dataHora: string
  ultimaMensagem: string
}

export default function HistoricoChats({title}) {
  // Estados
  const [chats, setChats] = useState<Chat[]>([])
  const [filteredChats, setFilteredChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [materiaFiltro, setMateriaFiltro] = useState<string>("todas")
  const [ordenacao, setOrdenacao] = useState<"recentes" | "antigos">("recentes")

  // Simular chamada de API para obter os chats
  useEffect(() => {
    // Simulando um atraso de rede
    const timer = setTimeout(() => {
      // Dados mockados
      const mockChats: Chat[] = [
        {
          id: "1",
          titulo: "Equações do segundo grau",
          materia: "Matemática",
          dataHora: "2023-05-15T14:30:00",
          ultimaMensagem: "Como resolver equações do segundo grau com delta negativo?",
        },
        {
          id: "2",
          titulo: "Leis de Newton",
          materia: "Física",
          dataHora: "2023-05-14T10:15:00",
          ultimaMensagem: "Quais são as aplicações da terceira lei de Newton?",
        },
        {
          id: "3",
          titulo: "Tabela Periódica",
          materia: "Química",
          dataHora: "2023-05-12T16:45:00",
          ultimaMensagem: "Como os elementos são organizados na tabela periódica?",
        },
        {
          id: "4",
          titulo: "Segunda Guerra Mundial",
          materia: "História",
          dataHora: "2023-05-10T09:20:00",
          ultimaMensagem: "Quais foram as principais causas da Segunda Guerra Mundial?",
        },
        {
          id: "5",
          titulo: "Revolução Industrial",
          materia: "História",
          dataHora: "2023-05-08T11:30:00",
          ultimaMensagem: "Como a Revolução Industrial impactou a sociedade?",
        },
        {
          id: "6",
          titulo: "Funções Orgânicas",
          materia: "Química",
          dataHora: "2023-05-05T15:10:00",
          ultimaMensagem: "Quais são as principais funções orgânicas e suas características?",
        },
        {
          id: "7",
          titulo: "Geometria Analítica",
          materia: "Matemática",
          dataHora: "2023-05-03T13:45:00",
          ultimaMensagem: "Como calcular a distância entre dois pontos no plano cartesiano?",
        },
        {
          id: "8",
          titulo: "Termodinâmica",
          materia: "Física",
          dataHora: "2023-05-01T10:00:00",
          ultimaMensagem: "O que é entropia e como ela se relaciona com a segunda lei da termodinâmica?",
        },
        {
          id: "9",
          titulo: "Redação Dissertativa",
          materia: "Português",
          dataHora: "2023-04-28T14:20:00",
          ultimaMensagem: "Quais são as partes essenciais de uma redação dissertativa-argumentativa?",
        },
        {
          id: "10",
          titulo: "Globalização",
          materia: "Geografia",
          dataHora: "2023-04-25T09:30:00",
          ultimaMensagem: "Quais são os impactos positivos e negativos da globalização?",
        },
      ]

      setChats(mockChats)
      setFilteredChats(mockChats)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar e ordenar chats
  useEffect(() => {
    let result = [...chats]

    // Filtrar por matéria
    if (materiaFiltro !== "todas") {
      result = result.filter((chat) => chat.materia === materiaFiltro)
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (chat) => chat.titulo.toLowerCase().includes(term) || chat.ultimaMensagem.toLowerCase().includes(term),
      )
    }

    // Ordenar por data
    result.sort((a, b) => {
      const dateA = new Date(a.dataHora).getTime()
      const dateB = new Date(b.dataHora).getTime()
      return ordenacao === "recentes" ? dateB - dateA : dateA - dateB
    })

    setFilteredChats(result)
  }, [chats, searchTerm, materiaFiltro, ordenacao])

  // Obter lista única de matérias para o filtro
  const materias = ["todas", ...new Set(chats.map((chat) => chat.materia))].sort()

  // Formatar data para exibição
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data)
  }

  return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{title}</h2>
        </div>

        {/* Filtros e Pesquisa */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Pesquisar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <select
              className="form-select"
              value={materiaFiltro}
              onChange={(e) => setMateriaFiltro(e.target.value)}
              aria-label="Filtrar por matéria"
            >
              {materias.map((materia) => (
                <option key={materia} value={materia}>
                  {materia === "todas" ? "Todas as matérias" : materia}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as "recentes" | "antigos")}
              aria-label="Ordenar por data"
            >
              <option value="recentes">Mais recentes</option>
              <option value="antigos">Mais antigos</option>
            </select>
          </div>
        </div>

        {/* Lista de Chats */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-muted">Carregando seu histórico...</p>
          </div>
        ) : filteredChats.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="list-group list-group-flush">
              {filteredChats.map((chat) => (
                <Link
                 to={`/home/chat/${chat.id}`}
                  key={chat.id}
                  className="list-group-item list-group-item-action p-3 border-bottom"
                >
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <h5 className="mb-1">{chat.titulo}</h5>
                    <small className="text-muted">{formatarData(chat.dataHora)}</small>
                  </div>
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <p className="mb-1 text-truncate" style={{ maxWidth: "70%" }}>
                      {chat.ultimaMensagem}
                    </p>
                    <span className="badge bg-light text-primary">{chat.materia}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-chat-left-text" style={{ fontSize: "3rem", color: "#d1d5db" }}></i>
            <p className="mt-3 text-muted">
              {searchTerm || materiaFiltro !== "todas"
                ? "Nenhuma conversa encontrada com os filtros atuais."
                : "Você ainda não iniciou nenhuma conversa."}
            </p>
            {searchTerm || materiaFiltro !== "todas" ? (
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => {
                  setSearchTerm("")
                  setMateriaFiltro("todas")
                }}
              >
                Limpar filtros
              </button>
            ) : (
              <Link to="/home" className="btn btn-primary mt-2">
                Iniciar uma conversa
              </Link>
            )}
          </div>
        )}
      </div>
  )
}
