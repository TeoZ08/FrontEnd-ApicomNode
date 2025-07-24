import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const inputTelefone = useRef();

  async function getUsers() {
    const usersFromapi = await api.get("/usuarios");
    setUsers(usersFromapi.data);
  }

  async function createUser() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      telefone: inputTelefone.current.value,
    });
    getUsers();

    inputName.current.value = "";
    inputAge.current.value = "";
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

  return (
    <div className="container">
      <form>
        <h1>Agenda de Contatos</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
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
      <div className="lista-contatos">
        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
              <p>
                Telefone: <span>{user.telefone}</span>
              </p>
            </div>

            <button type="button" onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt="Lixo" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
