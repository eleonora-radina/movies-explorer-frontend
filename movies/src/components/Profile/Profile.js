import { Link } from 'react-router-dom';

function Profile() {
  return(
    <div className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form' name='register-form'>
        <label className='profile__label'>
          Имя
          <input
            className='profile__input' 
            type='text'
            name='name'
            required
            minLength="2"
            maxLength="30"
            id='name-input'
            value='Владимир'
          />
        </label>
        <label className='profile__label'>
          E-mail
          <input 
            className='profile__input' 
            type='email'
            name='email'
            required
            id='email-input'
            value='pochta@yandex.ru'
          />
        </label>
        <button className='profile__edit-button' type='submit' aria-label='Редактировать'>Редактировать</button>
      </form>
      <Link to="/" className='profile__exit'>Выйти из аккаунта</Link>
    </div>
  )
}

export default Profile;