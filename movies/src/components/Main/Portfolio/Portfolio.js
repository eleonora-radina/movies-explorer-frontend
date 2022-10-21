import arrow from '../../../images/arrow.svg'

function Portfolio() {

  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>

      <div className='portfolio__link-zone'>
        <h3 className='portfolio__link'> Статичный сайт</h3>
        <img className='portfolio__arrow' src={arrow} alt='Стрелка для клика'></img>
      </div>
      <div className='portfolio__link-zone'>
        <h3 className='portfolio__link'>Адаптивный сайт</h3>
        <img className='portfolio__arrow' src={arrow} alt='Стрелка для клика'></img>
      </div>
      <div className='portfolio__link-zone'>
        <h3 className='portfolio__link'>Одностраничное приложение</h3>
        <img className='portfolio__arrow' src={arrow} alt='Стрелка для клика'></img>
      </div>
    </div>
  );
}

export default Portfolio;
