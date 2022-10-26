import { useLocation } from 'react-router-dom';

function MoviesCard(props) {

  let location = useLocation();
  let buttonClassName, cardClassName;

  switch(location.pathname) {
    case "/movies":
      cardClassName = 'movies-card';
      buttonClassName = `movies-card__like ${props.like ? 'movies-card__like_active' : ''}`;
      break;
    case "/saved-movies":
      cardClassName = 'movies-card movies-card_saved';
      buttonClassName = 'movies-card__like movies-card__like_delete';
      break;
    default:
      break;
  }

  return (
    <li className={cardClassName}>
      <img className="movies-card__image" src={props.image} alt='33 слова о дизайне' />
      <div className="movies-card__description-zone">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{props.title}</h2>
          <p className="movies-card__time">{props.time}</p>
        </div>
        <button className={buttonClassName} type="button" aria-label="Лайк" ></button>
      </div>
    </li>
  )
}

export default MoviesCard;