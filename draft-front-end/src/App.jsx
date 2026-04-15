import { useState } from 'react'
import logo01 from './assets/Imagens_logo/1.png'
import './App.css'
import api from './lib/axios'
import { useNavigate } from 'react-router-dom'
import routes from './routes'

function App() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true) //a tela inicial vai ser de login (nao de cadastro)

  // estados para os campos de login
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const toggleAuthMode = () => { // função para alternar entre as telas de login e cadastro
    setIsLogin((prevMode) => !prevMode) // inverte o valor de isLogin para mostrar a outra tela
    
    // Limpar os campos de entrada ao alternar entre as telas
    setName(''); setEmail(''); setPassword('');
  }

  //Função do cadastro
  const funcaoCadastro = async (e) => {
    e.preventDefault() // para evitar que a página seja recarregada ao enviar o formulário
    try {
      
      // pega a chave de segurança do LAravel (Sanctum) 
      await api.get('/sanctum/csrf-cookie');
      
      // envia os dados do cadastro para a API OU melhor, rota que criamos no laravel
      const response = await api.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: password, // Laravel exige a confirmação da senha
      });

      console.log(response.data);
      // Redireciona para onboarding (cadastro sempre é novo usuário)
      navigate(routes.onboarding);
      } catch (error) {
        // Captura os detalhes do erro (ex: 422 Unprocessable Content)
        const errorData = error.response?.data;
        console.error('Erro no cadastro detalhado: ', errorData);
        
        let errorMsg = "Erro ao cadastrar, verifique os dados e tente novamente.";
        
        // Se houver erros de validação específicos (ex: email já existe, senha curta)
        if (errorData?.errors) {
          const firstErrorKey = Object.keys(errorData.errors)[0];
          errorMsg = errorData.errors[firstErrorKey][0]; 
        } else if (errorData?.message) {
          errorMsg = errorData.message;
        }

        alert("Erro no cadastro: " + errorMsg);
      }
  }

  //Função do login
  const funcaoLogin = async (e) => {
    e.preventDefault() // para evitar que a página seja recarregada ao enviar o formulário
    try {
      // pega a chave de segurança do LAravel (Sanctum)
      await api.get('/sanctum/csrf-cookie');
      // envia os dados do login para a API OU melhor, rota que criamos no laravel
      const response = await api.post('/api/login', {
        email,
        password,
      });
      console.log(response.data);
      // Verifica se o usuário já completou o perfil
      if (response.data.has_profile) {
        navigate(routes.home);
      } else {
        navigate(routes.onboarding);
      }
      } catch (error) {
        console.error('Erro no login: ', error.response?.data);
        alert("Erro ao fazer login, verifique os dados e tente novamente.");
      }
  }

// HTML basicamente
  return (
    <div className={`auth-container ${!isLogin ? 'register-active' : ''}`}>
      <div className="auth-card"> {/* Card de autenticação que contém as duas faces (login e cadastro) */}
        
        {/* Face Frontal: Login */}
        <div className="auth-face front">
          <div className="brand-section">
            <img src={logo01} alt="Logo" className="logo" />
            <p className="subtitle">Onde o jogo começa!</p>
            <h1 className="title">Bem-vindo ao Draft</h1>
            
          </div>

          <form className="auth-form" onSubmit= {funcaoLogin}> {/*chama função do login*/}
            <div className="input-group">
              <label htmlFor="login-email">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
               placeholder="Seu e-mail" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="login-password">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              placeholder="Sua senha" required />
            </div>

            <button type="submit" className="btn-primary">
              Entrar
            </button>
          </form>

          <div className="toggle-section">
            Não tem uma conta?
            <button type="button" className="btn-toggle" onClick={toggleAuthMode}>
              Cadastre-se
            </button>
          </div>
        </div>

        {/* Face Traseira: Cadastro */}
        <div className="auth-face back">
          <div className="brand-section">
            <img src={logo01} alt="Logo" className="logo" />
            <h1 className="title">Crie sua conta</h1>
            <p className="subtitle">Preencha os dados abaixo para começar</p>
          </div>

          <form className="auth-form" onSubmit={funcaoCadastro}> {/**chama função aq */}
            <div className="input-group">
              <label htmlFor="reg-name">Nome Completo</label>
              <input type="text" value ={name} onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo" required />
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
               placeholder="Seu melhor e-mail" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="reg-password">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
               placeholder="Defina sua senha" required />
            </div>

            <button type="submit" className="btn-primary">
              Criar Conta
            </button>
          </form>

          <div className="toggle-section">
            Já possui conta?
            <button type="button" className="btn-toggle" onClick={toggleAuthMode}>
              Faça login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
