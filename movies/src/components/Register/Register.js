import { useState } from "react";
import { Link } from 'react-router-dom';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ name, email, password });
  }

  return (
    <div className='register'>
      <h2 className='auth__title'>Добро пожаловать!</h2>
      <form className='auth__form' name='register-form' onSubmit={handleSubmit}>
        <label className='auth__form-label'>
          Имя
          <input 
            className='auth__form-input' 
            type='text'
            name='name'
            required
            autoComplete="off"
            minLength="2"
            maxLength="30"
            id='name-input'
            onChange={handleNameChange}
          />
          <span className="auth__form-error name-input-error"></span>
        </label>
        <label className='auth__form-label'>
          E-mail
          <input 
            className='auth__form-input' 
            type='email'
            name='email'
            required
            autoComplete="off"
            id='email-input'
            onChange={handleEmailChange}
          />
          <span className="auth__form-error email-input-error"></span>
        </label>
        <label className='auth__form-label'>
          Пароль
          <input 
            className='auth__form-input' 
            type='password'
            name='password'
            required
            autoComplete="off"
            id='password-input'
            onChange={handlePasswordChange}
          />
          <span className="auth__form-error password-input-error"></span>
        </label>
        <button className='auth__form-button' type='submit' aria-label='Зарегистрироваться'>Зарегистрироваться</button>
      </form>
      <p className='auth__text'>Уже зарегистрированы?
        <Link to="/signin" className='auth__link'>Войти</Link>
      </p>
    </div>
  );
}

export default Register;
