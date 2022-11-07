import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg'
import search from '../../images/search.svg'
import Switch from '../Switch/Switch';

function SearchForm(props) {
  let location = useLocation();
  const [film, setFilm] = useState('');

  function handleFilmChange(e) {
    setFilm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.searchMovies(film);
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      setFilm(localStorage.getItem('search'));
    }
  }, [location.pathname])

  return (
    <div className='search'>
    <div className='search-form'>
      <img src={searchIcon} alt='Картинка поиск' className='search-form__icon'/>
      <form className='search-form__form' onSubmit={handleSubmit}>
        <input 
          className='search-form__input'
          type='text'
          name='text'
          placeholder="Фильм"
          required
          autoComplete="off"
          onChange={handleFilmChange}
          value={film || ''}
        />
        <button className='search-form__button' type='submit' aria-label='Поиск' >
          <img src={search} alt='Кнопка поиска' />
        </button>
      </form>
      </div>
      <Switch />
    </div>
  )
}

export default SearchForm;