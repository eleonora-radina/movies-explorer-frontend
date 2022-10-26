import { Link } from 'react-router-dom';

function Register() {

  return (
    <div className='register'>
      <h2 className='auth__title'>Добро пожаловать!</h2>
      <form className='auth__form' name='register-form'>
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
          />
          <span class="auth__form-error name-input-error"></span>
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
          />
          <span class="auth__form-error email-input-error"></span>
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
          />
          <span class="auth__form-error password-input-error"></span>
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
