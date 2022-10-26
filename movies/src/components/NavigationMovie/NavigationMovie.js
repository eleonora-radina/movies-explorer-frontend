import { Link, NavLink } from 'react-router-dom';

function NavigationMovie(props) {

  return (
      <nav className='navigation-movie'>
          <ul className='navigation__links'>
            <li><NavLink to='/movies' className='navigation__link' activeClassName='navigation__link_active'>Фильмы</NavLink></li>
            <li><NavLink to='/saved-movies' className='navigation__link' activeClassName='navigation__link_active'>Сохраненные фильмы</NavLink></li>
            <Link to='/profile'><button className='navigation__button navigation__button_style_profile' type="button">Аккаунт</button></Link>
          </ul>
        </nav>
  )
}

export default NavigationMovie;