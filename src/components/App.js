import { useState, useEffect, useCallback } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/api'
import { login, register, getContent } from '../utils/auth'

import Main from './Main'
import Header from './Header'
import Footer from './Footer'

import ImagePopup from './ImagePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'

import ProtectedRoute from './ProtectedRoute'
import Register from './Register'
import Login from './Login'

import InfoTooltip from './InfoTooltip'

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)
  const [infoTooltipPopup, setInfoTooltipPopup] = useState(false)
  const [isSuccess, setIsSuccess] = useState({ res: false, msg: '' })
  const [email, setEmail] = useState('')
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      api
      .getServerData()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((error) => console.log(error))
    }
  }, [loggedIn])

  function handleConfirmRegister(bool, msg) {
    setInfoTooltipPopup(true)
    setIsSuccess({ res: bool, msg: msg })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setInfoTooltipPopup(false)
    setSelectedCard({ name: '', link: '' })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
      })
      .catch((error) => console.log(error))
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards => cards.map(c => c._id === card._id ? newCard : c))
      })
      .catch((error) => console.log(error))
  }

  function handleAddPlaceSubmit(item) {
    setIsLoading(true)
    api
      .addCard(item)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  function handleLogin(email, password) {
    login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          handleConfirmRegister(true, 'Вы успешно зарегистрировались!')
          history.push('/sign-in')
        } else {
          handleConfirmRegister(false, 'Что-то пошло не так! Попробуйте ещё раз.')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function onSignOut() {
    localStorage.removeItem('jwt')
    history.push('/')
    setEmail('')
    setLoggedIn(false)
  }

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            history.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      history.push('/sign-in')
    }
  }, [history])

  useEffect(() => {
    tokenCheck()
  }, [tokenCheck])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} onSignOut={onSignOut} />

        <Switch>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleLikeCard}
            onCardDelete={handleDeleteCard}
          />
          <Route path='/'>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={infoTooltipPopup}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} isClose={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}
