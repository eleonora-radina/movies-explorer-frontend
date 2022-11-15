function MovieError(props) {
  
  return(
    <p className='movie-error'>{props.errorSearch ? props.errorSearch : "Ничего не найдено"}</p>
  )
}

export default MovieError;