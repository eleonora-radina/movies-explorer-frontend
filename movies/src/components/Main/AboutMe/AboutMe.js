import portrait from '../../../images/portrait.jpg'

function AboutMe() {

  return (
    <div className='about-me'>
      <h2 className='main__title'>Студент</h2>
      <hr className='main__line'></hr>

      <div className='about-me__info'>
        <div className='about-me__text-zone'>
          <h3 className='about-me__title'>Виталий</h3>
          <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__paragraph'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
  и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        
          <p className='about-me__link'>Github</p>
        </div>
        <img className='about-me__image' src={portrait} alt='Фотография студента'></img>
      </div>
    </div>
  );
}

export default AboutMe;
