import { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup({
  onUpdateProfile,
  isOpen,
  onClose,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')

  function handleUpdateName(e) {
    setName(e.target.value)
  }

  function handleUpdateAbout(e) {
    setAbout(e.target.value)
  }

  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateProfile({
      name: name,
      about: about,
    })
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor='name-input' className='popup__label'>
        <input
          type='text'
          placeholder='Имя'
          className='popup__input popup__input_string_name'
          onChange={handleUpdateName}
          value={name || ''}
          name='name'
          required
          minLength='2'
          maxLength='40'
          id='name-input'
        />
        <span className='popup__input-error name-input-error' />
      </label>
      <label htmlFor='job-input' className='popup__label'>
        <input
          type='text'
          placeholder='О себе'
          className='popup__input popup__input_string_job'
          onChange={handleUpdateAbout}
          value={about ? about : ''}
          name='about'
          required
          minLength='2'
          maxLength='200'
          id='job-input'
        />
        <span className='popup__input-error job-input-error' />
      </label>
    </PopupWithForm>
  )
}
