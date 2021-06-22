import { Route, Link } from 'react-router-dom'

export default function Header({ email, onSignOut }) {
  return (
    <header className='header'>
      <div className='header__logo' />
      <Route path='/sign-up'>
        <Link className='header__auth_link' to='/sign-in'>
          Войти
        </Link>
      </Route>
      <Route path='/sign-in'>
        <Link className='header__auth_link' to='/sign-up'>
          Регистрация
        </Link>
      </Route>
      <Route exact path='/'>
        <div className='header__auth'>
          <p className='header__auth_email'>{email}</p>
          <button
            className='header__auth_btn'
            onClick={onSignOut}
            type='button'
          >
            Выйти
          </button>
        </div>
      </Route>
    </header>
  )
}
