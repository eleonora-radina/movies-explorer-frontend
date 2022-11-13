import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MovieError from '../MovieError/MovieError'

function SavedMovies(props) {
  return(
    <div className='movies'>
      <SearchForm 
        searchMovies={props.searchMovies}
        isShortFilms={props.isShortFilms}
        handleSwitchClick={props.handleSwitchClick}
      />

      {(!props.movies.length) && <MovieError />}

      <MoviesCardList 
        movies={props.movies}
        onCardLike = {props.onCardLike}
        savedMovies={props.savedMovies}
      />
    </div>
  )
}

export default SavedMovies;