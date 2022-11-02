import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import film1 from '../../images/film1.png'
import film2 from '../../images/film2.png'
import film3 from '../../images/film3.png'

const cards = [
  {_id: 1, image: film1, title: '33 слова о дизайне', time: '1ч 47м', like: true},
  {_id: 2, image: film2, title: 'Киноальманах «100 лет дизайна»', time: '1ч 3м'},
  {_id: 3, image: film3, title: 'В погоне за Бенкси', time: '1ч 42м'},
  {_id: 4, image: film3, title: 'В погоне за Бенкси', time: '1ч 42м'},
  {_id: 5, image: film1, title: '33 слова о дизайне', time: '1ч 47м', like: true},
  {_id: 6, image: film2, title: 'Киноальманах «100 лет дизайна»', time: '1ч 3м'},
  {_id: 7, image: film2, title: 'Киноальманах «100 лет дизайна»', time: '1ч 3м'},
  {_id: 8, image: film3, title: 'В погоне за Бенкси', time: '1ч 42м', like: true},
  {_id: 9, image: film1, title: '33 слова о дизайне', time: '1ч 47м', like: true}
]

function Movies() {
  return(
    <div className='movies'>
      <SearchForm />
      <MoviesCardList 
        cards={cards}  
      />
    </div>
  )
}

export default Movies;