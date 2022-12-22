import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {

  let location = useLocation();
  let buttonClassName, cardClassName, imageLink;
  const [duration, setDuration] = useState('');
  const isLikedCard = props.savedMovies.some((m) => m.movieId === props.movie.id);

  useEffect(() => {
    const time = props.movie.duration;
    const hour = 60;
    if (time > hour) {
      setDuration(`${Math.floor(time / hour)}ч ${(time % hour)}м`);
    } else {
      setDuration(`${time}м`);
    }
  }, [props.movie.duration]);

  function handleCardLike() {
    props.onCardLike(props.movie);
  }
  
  switch(location.pathname) {
    case "/movies":
      cardClassName = 'movies-card';
      buttonClassName = `movies-card__like ${isLikedCard ? 'movies-card__like_active' : ''}`;
      imageLink = `https://api.nomoreparties.co/${props.movie.image.url}`
      break;
    case "/saved-movies":
      cardClassName = 'movies-card movies-card_saved';
      buttonClassName = 'movies-card__like movies-card__like_delete';
      imageLink = props.movie.image;
      break;
    default:
      break;
  }

  return (
    <li className={cardClassName} key={props.id}>
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={imageLink} alt='33 слова о дизайне' />
      </a>
      <div className="movies-card__description-zone">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{props.movie.nameRU}</h2>
          <p className="movies-card__time">{duration}</p>
        </div>
        <button className={buttonClassName} type="button" aria-label="Лайк" onClick={handleCardLike}></button>
      </div>
    </li>
  )
}

export default MoviesCard;