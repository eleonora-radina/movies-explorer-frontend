function AboutProject() {

  return (
    <div className='about-project'>
      <h2 className='main__title'>О проекте</h2>
      <hr className='main__line'></hr>

      <div className='about-project__two-columns'>
        <div className='about-project__description'>
         <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
         <p className='about-project__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__description'>
         <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
         <p className='about-project__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <ul className='about-project__timeline'>
        <li className='about-project__period about-project__period_backend-time'>1 неделя</li>
        <li className='about-project__period about-project__period_frontend-time'>4 недели</li>
        <li className='about-project__period about-project__period_backend'>Back-end</li>
        <li className='about-project__period about-project__period_frontend'>Front-end</li>
      </ul>
    </div>
  );
}

export default AboutProject;
