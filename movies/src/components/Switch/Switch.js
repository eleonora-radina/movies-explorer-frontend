function Switch(props) {

  return (
    <label htmlFor="switch" className="switch" onClick={props.handleSwitchClick}>
      <input type="checkbox" className={`switch__input ${props.isShortFilms ? 'switch__input_on' : ''}`} />
      <span className="switch__text">Короткометражки</span>
    </label>
  )
}

export default Switch;