function Footer() {

  return (
    <div className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className='footer__line'></hr>

      <nav className='footer__links-zone'>
        <p className='footer__copyright'>© 2020</p>
        <ul className='footer__links'>
          <li className='footer__link'>Яндекс.Практикум</li>
          <li className='footer__link'>Github</li>
        </ul>
      </nav>
    </div>
  );
}

export default Footer;
