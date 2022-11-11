import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import MovieError from '../MovieError/MovieError'

function Movies(props) {
  
  return(
    <div className='movies'>
      <SearchForm 
        searchMovies={props.searchMovies}
        isShortFilms={props.isShortFilms}
        handleSwitchClick={props.handleSwitchClick}
      />
      
      { props.isLoading && <Preloader /> }

      { ((localStorage.getItem('moviesApi') !== null) && !props.movies.length) && <MovieError />}

      <MoviesCardList 
        movies={props.movies}
        onCardLike = {props.onCardLike}
        savedMovies={props.savedMovies}
        onClickMore = {props.onClickMore}
        filteredWithoutSlice={props.filteredWithoutSlice}
      />
    </div>
  )
}

export default Movies;