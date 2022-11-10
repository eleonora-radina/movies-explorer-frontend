import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonMore from "../ButtonMore/ButtonMore";

function MoviesCardList(props) {
  let location = useLocation();
  let isNeedButton = true;
  if (location.pathname === '/movies') {
    if ((props.filteredWithoutSlice.length === props.movies.length) || (props.movies.length === 0)) {
      isNeedButton = false;
    };
  }

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

      { ((location.pathname === '/movies') && isNeedButton) && <ButtonMore onClickMore={props.onClickMore}/> }
    </div>
  )
}

export default MoviesCardList;
