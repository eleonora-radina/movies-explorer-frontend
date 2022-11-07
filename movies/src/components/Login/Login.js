import { useState } from "react";
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
  }

  return (
    <div className='login'>
      <h2 className='auth__title'>Рады видеть!</h2>
      <form className='auth__form' name='register-form' onSubmit={handleSubmit}>
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
            className='auth__form-input auth__form-input_error' 
            type='password'
            name='password'
            required
            autoComplete="off"
            id='password-input'
            onChange={handlePasswordChange}
          />
          <span className="auth__form-error password-input-error">Что-то пошло не так...</span>
        </label>
          <button className='auth__form-button auth__form-button_login' type='submit' aria-label='Войти'>Войти</button>
      </form>
      <p className='auth__text'>Ещё не зарегистрированы?
        <Link to="/signup" className='auth__link'>Регистрация</Link>
      </p>
    </div>
  );
}

export default Login;
