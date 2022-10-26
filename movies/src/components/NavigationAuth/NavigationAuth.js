import { Link } from 'react-router-dom';

function NavigationAuth() {

  return (
      <nav className='navigation-auth'>
          <ul className='navigation__links'>
            <li><Link exact to='/signup' className='navigation__link navigation__link_style_auth'>Регистрация</Link></li>
            <li><Link to='/signin'><button className='navigation__button navigation__button_style_signin' type="button">Войти</button></Link></li>
          </ul>
      </nav>
  )
}

export default NavigationAuth;