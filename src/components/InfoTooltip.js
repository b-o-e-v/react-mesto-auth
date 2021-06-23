import okIcon from '../images/ok.svg'
import errIcon from '../images/err.svg'

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section className={`popup popup__tooltip ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__container_type_tooltip'>
        <button
          onClick={onClose}
          className='popup__close popup__close_type_tooltip'
          type='button'
          aria-label='Закрыть'
        />
        <img
          className='popup__res'
          src={isSuccess.res ? okIcon : errIcon}
          alt={isSuccess.res ? 'успешно' : 'ошибка'}
        />
        <h3 className='popup__msg'>
          {isSuccess.msg}
        </h3>
      </div>
    </section>
  )
}
