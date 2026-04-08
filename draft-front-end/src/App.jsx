import { useState } from 'react'
import logo01 from './assets/Imagens_logo/1.png'
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true) //a tela inicial vai ser de login (nao de cadastro)

  const toggleAuthMode = () => { // função para alternar entre as telas de login e cadastro
    setIsLogin((prevMode) => !prevMode) // inverte o valor de isLogin para mostrar a outra tela
  }

  return (

    <div className={`auth-container ${!isLogin ? 'register-active' : ''}`}>
      <div className="auth-card"> {/* Card de autenticação que contém as duas faces (login e cadastro) */}
        
        {/* Face Frontal: Login */}
        <div className="auth-face front">
          <div className="brand-section">
            <img src={logo01} alt="Logo" className="logo" />
            <h1 className="title">Bem-vindo de volta</h1>
            <p className="subtitle">Faça login na sua conta para continuar</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}> {/**define para onde vai ao clicar o botão */}
            <div className="input-group">
              <label htmlFor="login-email">E-mail</label>
              <input type="email" id="login-email" placeholder="Seu e-mail" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="login-password">Senha</label>
              <input type="password" id="login-password" placeholder="Sua senha" required />
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

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}> {/**define para onde vai ao clicar o botão */}
            <div className="input-group">
              <label htmlFor="reg-name">Nome Completo</label>
              <input type="text" id="reg-name" placeholder="Seu nome completo" required />
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">E-mail</label>
              <input type="email" id="reg-email" placeholder="Seu melhor e-mail" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="reg-password">Senha</label>
              <input type="password" id="reg-password" placeholder="Defina sua senha" required />
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
