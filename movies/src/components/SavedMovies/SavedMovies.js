import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return(
    <div className='movies'>
      <SearchForm 
        searchMovies={props.searchMovies}
      />
      <MoviesCardList 
        movies={props.movies}
        onCardLike = {props.onCardLike}
        savedMovies={props.savedMovies}
      />
    </div>
  )
}

export default SavedMovies;