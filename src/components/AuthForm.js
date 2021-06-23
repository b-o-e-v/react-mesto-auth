export default function AuthForm({
  title,
  btnText,
  email,
  password,
  handleChangeEmail,
  handleChangePassword,
  handleSubmit,
  children
}) {
  return (
    <section className='auth'>
      <form className='auth__form' onSubmit={handleSubmit}>
        <h3 className='auth__title'>{title}</h3>
        <fieldset className='auth__field'>
          <input
            name='email'
            type='email'
            pattern='\S+@\S+\.\S+'
            className='auth__input'
            value={email || ''}
            onChange={handleChangeEmail}
            placeholder='Email'
            required
          />
          <input
            name='password'
            type='password'
            className='auth__input'
            value={password || ''}
            onChange={handleChangePassword}
            required
            placeholder='Пароль'
            minLength='8'
          />
        </fieldset>
        <button className='auth__btn' type='submit'>
          {btnText}
        </button>
        {children}
      </form>
    </section>
  )
}
