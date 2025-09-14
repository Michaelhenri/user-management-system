import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  return (
    
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input name='name' type="text" />
          <input name='age' type="number" />
          <input name='email' type="email" />
          <button type='button'>Cadastrar</button>
        </form>

        <div>
          <div>
            <p>Nome: </p>
            <p>Idade: </p>
            <p>Email: </p>
          </div>
          <button>
            <img src={Trash} alt="Lixeira" />
          </button>
        </div>
      </div>
     
  )
}

export default Home
