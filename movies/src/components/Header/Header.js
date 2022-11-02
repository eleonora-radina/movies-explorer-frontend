import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationMovie from '../NavigationMovie/NavigationMovie';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

function Header() {
  let location = useLocation();
  let classHeader, classHeaderLogo;
  let pathForNavAuth = false;
  let pathForMovieAuth = false;
  
  switch(location.pathname) {
    case "/":
      pathForNavAuth = true;
      break;
    
    case "/movies":
    case "/saved-movies":
    case "/profile":
      classHeader='header_style_movies';
      pathForMovieAuth = true;
      break;

    case "/signin":
    case "/signup":
      classHeader = 'header_style_auth';
      classHeaderLogo = 'header__logo_style_auth';
      break;

    default:
      classHeader = 'header_style_none';
      break;
  }

  return (
    <header className={`header ${classHeader}`}>
      <Link to="/"><img className={`header__logo ${classHeaderLogo}`} src={logo} alt='Логотип проекта' /></Link>

      { pathForNavAuth && <NavigationAuth /> }
      { pathForMovieAuth && 
        <div>
          <NavigationMovie /> 
          <MobileNavigation />
        </div>
      }

    </header>
  )
}

export default Header;
