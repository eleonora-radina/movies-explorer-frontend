import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const [isValid, setIsValid] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (e.target.validity) {
      e.target.validity.patternMismatch 
      ? setErrorEmail(`Введите данные в указанном формате: info@ya.ru`)
      : setErrorEmail(e.target.validationMessage);
    } else {
      setErrorEmail(null);
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (e.target.validity) {
      setErrorPassword(e.target.validationMessage);
    } else {
      setErrorPassword(null);
    }
  }

  useEffect(() => {
    (errorEmail === "" && errorPassword === "") 
    ? setIsValid(true) 
    : setIsValid(false); 
  }, [errorEmail, errorPassword])

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
  }

  return (
    <div className='login'>
      <h2 className='auth__title'>Рады видеть!</h2>
      <form className='auth__form' name='register-form' onSubmit={handleSubmit} noValidate>
        <label className='auth__form-label'>
          E-mail
          <input 
            className={`auth__form-input ${errorEmail ? 'auth__form-input_error' : ''}`}
            type='email'
            name='email'
            required
            autoComplete="off"
            id='email-input'
            onChange={handleEmailChange}
            pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
          />
          <span className="auth__form-error">{errorEmail}</span>
        </label>
        <label className='auth__form-label'>
          Пароль
          <input 
            className={`auth__form-input ${errorPassword ? 'auth__form-input_error' : ''}`}
            type='password'
            name='password'
            required
            autoComplete="off"
            id='password-input'
            onChange={handlePasswordChange}
          />
          <span className="auth__form-error">{errorPassword}</span>
        </label>

        <p className="auth__error auth__error_login">{props.error ? props.error : ""}</p>
        
          <button 
            className={`auth__form-button ${isValid ? 'auth__form-button_valid' : ''}`} 
            disabled={!isValid}
            type='submit' 
            aria-label='Войти'>
            Войти
          </button>
      </form>
      <p className='auth__text'>Ещё не зарегистрированы?
        <Link to="/signup" className='auth__link'>Регистрация</Link>
      </p>
    </div>
  );
}

export default Login;
