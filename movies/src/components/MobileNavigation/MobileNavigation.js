import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react'

function MobileNavigation() {

  const [open, setOpen] = useState(false);

  return (
    <div className='mobile-navigation'>
      <button
        className={`mobile-navigation__humburger-icon ${open ? "mobile-navigation__humburger-icon_open" : ''}`}
        onClick={() => setOpen(true)}
        type="button"
      />

      <div className={`mobile-navigation__background ${open ? 'mobile-navigation__background_open' : ''}`}>
        <div className={`mobile-navigation__menu ${open ? 'mobile-navigation__menu_open' : ''}`}>
          <button 
            className='mobile-navigation__button-exit' 
            onClick={() => setOpen(false)}
            type="button"
          />
          <nav className="mobile-navigation__zone">
            <ul className="mobile-navigation__links">
              <li>
                <NavLink
                  exact to='/'
                  className='mobile-navigation__link'
                  activeClassName='mobile-navigation__link_active'
                  onClick={() => setOpen(false)} >
                    Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/movies'
                  className='mobile-navigation__link'
                  activeClassName='mobile-navigation__link_active'
                  onClick={() => setOpen(false)} >
                    Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/saved-movies'
                  className='mobile-navigation__link'
                  activeClassName='mobile-navigation__link_active'
                  onClick={() => setOpen(false)} >
                    Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
            <Link to='/profile'>
              <button 
                className='navigation__button_style_profile mobile-navigation__button' 
                onClick={() => setOpen(false)} 
                type="button" >
                  Аккаунт
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation;