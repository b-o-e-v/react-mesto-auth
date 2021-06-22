import { useState, useEffect } from 'react'

import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setTitle('')
    setLink('')
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: title,
      link: link,
    })
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      buttonText={isLoading ? 'Сохранение...' : 'Cоздать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor='card-name-input' className='popup__label'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Название'
          className='popup__input popup__input_string_card-name'
          name='name'
          required
          minLength='2'
          maxLength='30'
          id='card-name-input'
        />
        <span className='popup__input-error card-name-input-error' />
      </label>
      <label htmlFor='card-link-input' className='popup__label'>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_string_card-link'
          name='link'
          required
          id='card-link-input'
        />
        <span className='popup__input-error card-link-input-error' />
      </label>
    </PopupWithForm>
  )
}
