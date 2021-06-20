import { useEffect, useRef } from 'react'

import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({
  onUpdateAvatar,
  isOpen,
  onClose,
  isLoading,
}) {
  const avatarRef = useRef('')

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='update'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor='card-link-input-avatar' className='popup__label'>
        <input
          ref={avatarRef}
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_string_card-link'
          name='avatar'
          required
          id='card-link-input-avatar'
        />
        <span className='popup__input-error card-link-input-avatar-error' />
      </label>
    </PopupWithForm>
  )
}
