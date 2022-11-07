import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonMore from "../ButtonMore/ButtonMore";

function MoviesCardList(props) {

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__zone">
        {props.movies.map((movie => {
          return <MoviesCard 
            key = {movie._id}
            movie = {movie}
            onCardLike = {props.onCardLike}
            savedMovies={props.savedMovies}
          />
        }))}
      </ul>
      {/*<ButtonMore />*/}
    </div>
  )
}

export default MoviesCardList;
