import { useEffect, useState, useRef, useCallback } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

// Função auxiliar para criar uma pausa (delay)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function Home() {
  // === ESTADOS ===
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [error, setError] = useState(null); // Novo estado para controlar erros

  // === REFS para os inputs do formulário ===
  const inputName = useRef();
  const inputDataNascimento = useRef();
  const inputEmail = useRef();
  const inputTelefone = useRef();

  // === FUNÇÕES DE API ===

  // Nova versão do getUsers com lógica de retentativa para o "cold start"
  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpa erros antigos no início

    for (let i = 0; i < 3; i++) {
      // Tenta buscar os dados até 3 vezes
      try {
        const usersFromApi = await api.get("/usuarios");
        setUsers(usersFromApi.data);
        setLoading(false);
        return; // Sucesso! Sai da função.
      } catch (err) {
        console.error(`Tentativa ${i + 1} de buscar usuários falhou:`, err);
        if (i < 2) {
          // Se não for a última tentativa...
          await delay(3000); // ...espera 3 segundos antes de tentar de novo.
        } else {
          // Se for a última tentativa e ainda assim falhou...
          setError(
            "Não foi possível carregar os contatos. O servidor pode estar offline. Tente recarregar a página."
          );
          setLoading(false);
        }
      }
    }
  }, []);

  async function createUser() {
    if (!inputName.current.value || !inputEmail.current.value) {
      return alert("Nome e Email são obrigatórios.");
    }
    await api.post("/usuarios", {
      name: inputName.current.value,
      dataNascimento: inputDataNascimento.current.value,
      email: inputEmail.current.value,
      telefone: inputTelefone.current.value,
    });
    getUsers(); // Recarrega a lista

    // Limpa os campos
    inputName.current.value = "";
    inputDataNascimento.current.value = "";
    inputEmail.current.value = "";
    inputTelefone.current.value = "";
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers(); // Recarrega a lista
  }

  // === EFEITO INICIAL ===
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // === LÓGICA DE FILTRO ===
  const usersFiltrados = users.filter((user) =>
    user.name.toLowerCase().includes(busca.toLowerCase())
  );

  // === RENDERIZAÇÃO DO COMPONENTE ===
  return (
    <div className="container">
      <form>
        <h1>Agenda de Contatos</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input name="dataNascimento" type="date" ref={inputDataNascimento} />
        <input placeholder="Email" name="email" type="email" ref={inputEmail} />
        <input
          placeholder="Telefone"
          name="telefone"
          type="tel"
          ref={inputTelefone}
        />
        <button type="button" onClick={createUser}>
          Cadastrar
        </button>
      </form>

      <div className="busca-container">
        <input
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar contatos pelo nome..."
          value={busca}
        />
      </div>

      <div className="lista-contatos">
        {/* Exibe o Spinner apenas se estiver carregando */}
        {loading && <div className="loading-spinner"></div>}

        {/* Exibe a mensagem de erro se houver um erro */}
        {error && <p className="mensagem-erro">{error}</p>}

        {/* Exibe os cards apenas se NÃO estiver carregando, NÃO houver erro e a lista tiver itens */}
        {!loading &&
          !error &&
          usersFiltrados.length > 0 &&
          usersFiltrados.map((user) => (
            <div key={user.id} className="card">
              <div className="card-info">
                <p>
                  Nome: <span>{user.name}</span>
                </p>
                <p>
                  Nascimento:{" "}
                  <span>
                    {user.dataNascimento
                      ? new Date(user.dataNascimento).toLocaleDateString(
                          "pt-BR"
                        )
                      : "N/A"}
                  </span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <p>
                  Telefone: <span>{user.telefone || "N/A"}</span>
                </p>
              </div>
              <div className="card-actions">
                <button type="button" onClick={() => deleteUser(user.id)}>
                  <img src={Trash} alt="Deletar" />
                </button>
              </div>
            </div>
          ))}

        {/* Exibe a mensagem de "nenhum contato" se NÃO estiver carregando, NÃO houver erro e a lista estiver vazia */}
        {!loading && !error && usersFiltrados.length === 0 && (
          <p>Nenhum contato encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
