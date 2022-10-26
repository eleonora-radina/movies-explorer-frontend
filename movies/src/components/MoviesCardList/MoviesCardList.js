import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonMore from "../ButtonMore/ButtonMore";

function MoviesCardList(props) {

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__zone">
        {props.cards.map((card => {
          return <MoviesCard 
            key = {card._id}
            image = {card.image}
            title = {card.title}
            time = {card.time}
            like = {card.like}
          />
        }))}
      </ul>
      <ButtonMore />
    </div>
  )
}

export default MoviesCardList;