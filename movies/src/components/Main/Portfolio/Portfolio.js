import arrow from '../../../images/arrow.svg'

function Portfolio() {

  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <a href='https://eleonora-radina.github.io/russian-travel/' target="_blank" className='portfolio__link-zone' rel="noreferrer">
          <h3 className='portfolio__link-text'> Статичный сайт</h3>
          <img className='portfolio__arrow' src={arrow} alt='Стрелка для клика'/>
      </a>
      <a href='https://eleonora-radina.github.io/russian-travel/' target="_blank" className='portfolio__link-zone' rel="noreferrer">
          <h3 className='portfolio__link-text'>Адаптивный сайт</h3>
          <img className='portfolio__arrow' src={arrow} alt='Стрелка для клика'/>
      </a>
      <a href='https://noradina.nomoredomains.icu/' target="_blank" className='portfolio__link-zone' rel="noreferrer">
          <h3 className='portfolio__link-text'>Одностраничное приложение</h3>
          <img className='portfolio__arrow' src={arrow} alt='Стрелка для клика'/>
      </a>
    </div>
  );
}

export default Portfolio;
