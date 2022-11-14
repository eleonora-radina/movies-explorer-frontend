import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const [isValid, setIsValid] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.validity) {
      e.target.validity.patternMismatch
        ? setErrorName(`Имя должно содержать только буквы, пробел или дефис`)
        : setErrorName(e.target.validationMessage);
    } else {
      setErrorName(null);
    }
  }

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
    (errorName === "" && errorEmail === "" && errorPassword === "") 
    ? setIsValid(true) 
    : setIsValid(false);
  }, [errorName, errorEmail, errorPassword])

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ name, email, password });
  }

  return (
    <div className='register'>
      <h2 className='auth__title'>Добро пожаловать!</h2>
      <form className='auth__form' name='register-form' onSubmit={handleSubmit} noValidate>
        <label className='auth__form-label'>
          Имя
          <input
            className={`auth__form-input ${errorName ? 'auth__form-input_error' : ''}`}
            type='text'
            name='name'
            required
            autoComplete="off"
            minLength="2"
            maxLength="30"
            id='name-input'
            pattern="^[a-zA-Zа-яёА-ЯЁ\s\-]*$"
            onChange={handleNameChange}
          />
          <span className="auth__form-error">{errorName}</span>
        </label>
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
            pattern="(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$)"
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

        <p className="auth__error">{props.error}</p>

        <button
          className={`auth__form-button ${isValid ? 'auth__form-button_valid' : ''}`}
          disabled={!isValid}
          type='submit'
          aria-label='Зарегистрироваться'>
          Зарегистрироваться
        </button>
      </form>
      <p className='auth__text'>Уже зарегистрированы?
        <Link to="/signin" className='auth__link'>Войти</Link>
      </p>
    </div>
  );
}

export default Register;
