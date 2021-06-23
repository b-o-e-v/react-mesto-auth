import { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthForm from './AuthForm'

export default function Register({ onRegister }) {
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
    onRegister(email, password)
  }

  return (
    <AuthForm
      title='Регистрация'
      btnText='Зарегистрироваться'
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleSubmit={handleSubmit}
    >
      <Link to='/sign-in' className='auth__link'>
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  )
}
