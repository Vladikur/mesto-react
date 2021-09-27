function Card(props) {

    function handleClick() {
        props.onCardClick(props.openedCard);
    }  

    return (
        <li className="card">
            <button aria-label="Удаление карточки" type="button" className="card__remove"></button>
            <div className="card__image-container">
                <img onClick={handleClick} src={props.cardImage} alt={props.cardName} className="card__image" />
            </div>
            <div className="card__description-container">
                <h2 className="card__description">{props.cardName}</h2>
                <div className="card__button-container">
                  <button aria-label="Лайк" type="button" className="card__like"></button>
                  <p className="card__likes">{props.cardLikes.length}</p>
                </div>
            </div>
        </li>
    );
}
export default Card;