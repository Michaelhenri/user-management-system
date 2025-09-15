import { useEffect, useState } from 'react' // Remova o useRef
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', age: '', email: '' }) // Novo estado para o formulário

  async function getUsers() {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  // Função para lidar com a mudança nos inputs
  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //Esta função será chamada quando o botão "editar" for clicado
  function handleEditUser(user) {
    setEditingUser(user);
    setFormData({
      name: user.name,
      age: user.age,
      email: user.email
    });
  }

  async function createUsers() {
    // Limpa qualquer mensagem de erro anterior antes de fazer a requisição
    setErrorMessage('');

    try {
      await api.post('/users', {
        name: formData.name,
        age: Number(formData.age),
        email: formData.email
      });

      // Limpa o formulário e recarrega a lista de usuários em caso de sucesso
      setFormData({ name: '', age: '', email: '' });
      getUsers();

    } catch (error) {
      // Se a requisição falhou
      if (error.response && error.response.data && error.response.data.message) {
        // Captura a mensagem de erro enviada pelo back-end
        setErrorMessage(error.response.data.message);
      } else {
        // Se for outro tipo de erro (ex: falha de conexão)
        setErrorMessage('Erro ao conectar com o servidor.');
      }
    }
  }

  //Essa função será responsável por fazer a requisição PUT para o back-end.
  async function updateUser() {
    setErrorMessage('');

    try {
      await api.put(`/users/${editingUser.id}`, {
        name: formData.name,
        age: Number(formData.age),
        email: formData.email
      });

      setFormData({ name: '', age: '', email: '' });
      setEditingUser(null); // Limpa o estado de edição
      getUsers();

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erro ao conectar com o servidor.');
      }
    }
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <input
          placeholder='Nome'
          name='name'
          type="text"
          value={formData.name} // Vincula ao estado
          onChange={handleInputChange} // Atualiza o estado
        />
        <input
          placeholder='Idade'
          name='age'
          type="number"
          value={formData.age} // Vincula ao estado
          onChange={handleInputChange} // Atualiza o estado
        />
        <input
          placeholder='E-mail'
          name='email'
          type="email"
          value={formData.email} // Vincula ao estado
          onChange={handleInputChange} // Atualiza o estado
        />
        <button type='button' onClick={editingUser ? updateUser : createUsers}>
          {editingUser ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <div className='card-actions'>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Lixeira" />
            </button>
            <button onClick={() => handleEditUser(user)}>
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home