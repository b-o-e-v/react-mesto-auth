export const BASE_URL = 'https://auth.nomoreparties.co'

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      try {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 400) {
          throw new Error('Не верно заполнено одно из полей')
        }
        if (res.status === 401) {
          throw new Error('Пользователь с данным email не найден ')
        }
      } catch (error) {
        console.log(error)
        return error
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        return data
      }
    })
    .catch((error) => {
      return Promise.reject(error.message)
    })
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      try {
        if (res.status !== 400) {
          return res.json()
        }
      } catch (error) {
        throw new Error('Некорректно заполнено одно из полей')
      }
    })
    .then((res) => {
      return res
    })
    .catch((error) =>
      console.log(error + { message: 'Некорректно заполнено одно из полей' })
    )
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json()
        }
        if (res.status === 400) {
          throw new Error('Токен не передан или передан не в том формате')
        }
        if (res.status === 401) {
          throw new Error('Переданный токен некорректен')
        }
      } catch (error) {
        console.log(error)
        return error
      }
    })
    .then((data) => {
      return data
    })
    .catch((error) => console.log(error))
}
