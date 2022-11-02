import searchIcon from '../../images/searchIcon.svg'
import search from '../../images/search.svg'
import Switch from '../Switch/Switch';

function SearchForm() {

  return (
    <div className='search'>
    <div className='search-form'>
      <img src={searchIcon} alt='Картинка поиск' className='search-form__icon'/>
      <form className='search-form__form'>
        <input 
          className='search-form__input'
          type='text'
          name='text'
          placeholder="Фильм"
          required
          autoComplete="off"
        />
        <button className='search-form__button' type='submit' aria-label='Поиск'>
          <img src={search} alt='Кнопка поиска' />
        </button>
      </form>
      </div>
      <Switch />
    </div>
  )
}

export default SearchForm;