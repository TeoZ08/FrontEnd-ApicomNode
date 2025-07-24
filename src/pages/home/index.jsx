import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  const inputName = useRef();
  const inputDataNascimento = useRef();
  const inputEmail = useRef();
  const inputTelefone = useRef();

  async function getUsers() {
    setLoading(true);
    try {
      const usersFromApi = await api.get("/usuarios");
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Falha ao carregar os contatos. Verifique se a API está no ar.");
    } finally {
      setLoading(false);
    }
  }

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
    getUsers();

    inputName.current.value = "";
    inputDataNascimento.current.value = "";
    inputEmail.current.value = "";
    inputTelefone.current.value = "";
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  const usersFiltrados = users.filter((user) =>
    user.name.toLowerCase().includes(busca.toLowerCase())
  );

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
        />
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="lista-contatos">
          {usersFiltrados.map((user) => (
            <div key={user.id} className="card">
              <div className="card-info">
                <p>
                  Nome: <span>{user.name}</span>
                </p>
                <p>
                  Data de Nasc.:{" "}
                  <span>
                    {new Date(user.dataNascimento).toLocaleDateString("pt-BR")}
                  </span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <p>
                  Telefone: <span>{user.telefone}</span>
                </p>
              </div>
              <div className="card-actions">
                <button type-="button" onClick={() => deleteUser(user.id)}>
                  <img src={Trash} alt="Deletar" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
