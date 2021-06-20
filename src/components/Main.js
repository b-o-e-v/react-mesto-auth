import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import Card from './Card.js'

export default function Main({
  onEditAvatar,
  onEditProfile,
  onCardDelete,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__info'>
          <div className='profile__container'>
            <img
              src={currentUser.avatar}
              alt='аватар'
              className='profile__avatar'
            />
            <button onClick={onEditAvatar} className='profile__avatar-btn' />
          </div>
          <div className='profile__about'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <p className='profile__description'>{currentUser.about}</p>
          </div>
          <button
            onClick={onEditProfile}
            className='profile__edit'
            type='button'
          />
        </div>
        <button onClick={onAddPlace} className='profile__add' type='button' />
      </section>
      <section className='gallery'>
        <ul className='cards'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
