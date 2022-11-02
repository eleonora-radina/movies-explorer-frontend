import { useLocation } from 'react-router-dom';

function Footer() {

  let location = useLocation();
  let pathname = true;

  switch (location.pathname) {
    case "/":
    case "/movies":
    case "/saved-movies":
      break;

    case "/profile":
    case "/signin":
    case "/signup":
    default:
      pathname = false;
      break;
  }

  return (
    <div>
      { pathname &&
        <div className='footer'>
          <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <hr className='footer__line'></hr>

          <nav className='footer__links-zone'>
            <p className='footer__copyright'>© 2020</p>
            <ul className='footer__links'>
              <li><a className='footer__link' href='https://practicum.yandex.ru/' target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
              <li><a className='footer__link' href='https://github.com' target="_blank" rel="noreferrer">Github</a></li>
            </ul>
          </nav>
        </div>
      }
    </div>
  );
}

export default Footer;
