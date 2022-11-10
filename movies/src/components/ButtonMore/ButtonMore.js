function ButtonMore(props) {

  return (
    <button className="button-more" type="button" aria-label="Еще" onClick={props.onClickMore}>Ещё</button>
  )
}

export default ButtonMore;