import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <header className='header'>
      <Link to="/"><img className='header__logo' src={logo} alt='Логотип проекта'></img></Link>
      <nav className='header__links'>
        <Link to="/signup" className='header__link'>Регистрация</Link>
        <Link to="/signin"><button className='header__button'>Войти</button></Link>
      </nav>
    </header>
  )
}

export default Header;