import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const userData = React.useContext(CurrentUserContext);

    const isOwn = props.openedCard.owner._id === userData._id;
    const cardDeleteButtonClassName = (
        `card__remove ${isOwn ? '' : 'card__remove_visibility_hide'}`
    );

    const isLiked = props.cardLikes.some(i => i._id === userData._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    ); 

    function handleClick() {
        props.onCardClick(props.openedCard);
    }

    function handleLikeClick() {
        props.onCardLike(props.openedCard);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.openedCard);
    }

    return (
        <li className="card">
            <button onClick={handleDeleteClick} aria-label="Удаление карточки" type="button" className={cardDeleteButtonClassName}></button>
            <div className="card__image-container">
                <img onClick={handleClick} src={props.cardImage} alt={props.cardName} className="card__image" />
            </div>
            <div className="card__description-container">
                <h2 className="card__description">{props.cardName}</h2>
                <div className="card__button-container">
                  <button onClick={handleLikeClick} aria-label="Лайк" type="button" className={cardLikeButtonClassName}></button>
                  <p className="card__likes">{props.cardLikes.length}</p>
                </div>
            </div>
        </li>
    );
}
export default Card;