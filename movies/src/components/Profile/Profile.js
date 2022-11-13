import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser =  useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.validity) {
      e.target.validity.patternMismatch
        ? setErrorName(`Имя должно содержать только буквы, пробел или дефис`)
        : setErrorName(e.target.validationMessage);
    } else {
      setErrorName("");
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (e.target.validity) {
      e.target.validity.patternMismatch
        ? setErrorEmail(`Введите данные в указанном формате: info@ya.ru`)
        : setErrorEmail(e.target.validationMessage);
    } else {
      setErrorEmail("");
    }
  }

  useEffect(() => {
    (errorName === "" && errorEmail === "") 
    ? setIsValid(true) 
    : setIsValid(false);
  }, [errorName, errorEmail])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      email,
    });
  }

  return(
    <div className='profile'>
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
      <form className='profile__form' name='register-form' onSubmit={handleSubmit} noValidate>
        <label className='profile__label'>
          Имя
          <input
            className={`profile__input ${errorName ? 'auth__form-input_error' : ''}`}
            type='text'
            name='name'
            required
            minLength="2"
            maxLength="30"
            id='name-input'
            value={name || ''}
            pattern="^[a-zA-Zа-яёА-ЯЁ\s\-]*$"
            onChange={handleNameChange}
          />
          <span className="profile__form-error">{errorName}</span>
        </label>
        <label className='profile__label'>
          E-mail
          <input 
            className={`profile__input ${errorEmail ? 'auth__form-input_error' : ''}`}
            type='email'
            name='email'
            required
            id='email-input'
            value={email || ''}
            pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
            onChange={handleEmailChange}
          />
          <span className="profile__form-error">{errorEmail}</span>
        </label>

        <p className="auth__error">{props.error}</p>

        <button 
          className={`profile__edit-button ${isValid ? 'profile__edit-button_valid' : ''}`}
          type='submit' 
          aria-label='Редактировать'
          disabled={!isValid}>
          Редактировать
        </button>
      </form>
      <Link to="/" className='profile__exit' onClick={props.onLogout}>Выйти из аккаунта</Link>
    </div>
  )
}

export default Profile;