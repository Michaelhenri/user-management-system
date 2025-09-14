import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  const users = [
    {
      id: '1564d5f4fds',
      name: 'Michael',
      age: 29,
      email: 'michael@email.com'
    },
    {
      id: '1564d5156156',
      name: 'Larissa',
      age: 32,
      email: 'larissa@email.com'
    },
  ]
  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='name' type="text" />
        <input placeholder='Idade' name='age' type="number" />
        <input placeholder='E-mail' name='email' type="email" />
        <button type='button'>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Trash} alt="Lixeira" />
          </button>
        </div>
      ))}

    </div>

  )
}

export default Home
