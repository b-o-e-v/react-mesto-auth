import { useState } from 'react'
import AuthForm from './AuthForm'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      return
    }
    onLogin(email, password)
  }

  return (
    <AuthForm
      title='Вход'
      btnText='Войти'
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleSubmit={handleSubmit}
    />
  )
}
