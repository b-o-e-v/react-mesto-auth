import { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/api'

import Main from './Main'
import Header from './Header'
import Footer from './Footer'

import ImagePopup from './ImagePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    api
      .getServerData()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((error) => console.log(error))
  }, [])

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
        const newCards = cards.filter((c) => c._id !== card._id)
        setCards(newCards)
      })
      .catch((error) => console.log(error))
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c))
        setCards(newCards)
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteCard}
          onCardLike={handleLikeCard}
          cards={cards}
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
