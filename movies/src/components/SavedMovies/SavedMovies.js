import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import film1 from '../../images/film1.png'
import film3 from '../../images/film3.png'

const savedCards = [
  {_id: 1, image: film1, title: '33 слова о дизайне', time: '1ч 47м', like: true},
  {_id: 5, image: film1, title: '33 слова о дизайне', time: '1ч 47м', like: true},
  {_id: 8, image: film3, title: 'В погоне за Бенкси', time: '1ч 42м', like: true},
  {_id: 9, image: film1, title: '33 слова о дизайне', time: '1ч 47м', like: true}
]


function SavedMovies() {
  return(
    <div className='movies'>
      <SearchForm />
      <MoviesCardList 
        cards={savedCards}
      />
    </div>
  )
}

export default SavedMovies;