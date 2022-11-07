import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser =  useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

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
      <form className='profile__form' name='register-form' onSubmit={handleSubmit}>
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
            value={name || ''}
            onChange={handleNameChange}
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
            value={email || ''}
            onChange={handleEmailChange}
          />
        </label>
        <button className='profile__edit-button' type='submit' aria-label='Редактировать'>Редактировать</button>
      </form>
      <Link to="/" className='profile__exit' onClick={props.onLogout}>Выйти из аккаунта</Link>
    </div>
  )
}

export default Profile;