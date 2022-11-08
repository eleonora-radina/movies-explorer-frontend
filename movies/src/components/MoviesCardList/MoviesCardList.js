import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonMore from "../ButtonMore/ButtonMore";

function MoviesCardList(props) {
  let location = useLocation();

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__zone">
        {props.movies.map((movie => {
          return <MoviesCard 
            key = {movie.id}
            id = {movie.id}
            movie = {movie}
            onCardLike = {props.onCardLike}
            savedMovies={props.savedMovies}
          />
        }))}
      </ul>
      { (location.pathname === '/movies') && <ButtonMore /> }
    </div>
  )
}

export default MoviesCardList;
