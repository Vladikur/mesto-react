import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const userData = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
            <div className="profile__container">
                <div className="profile__image-container">
                    <button aria-label="Изменение имени и описания профиля" type="button" className="profile__image-redact"></button>
                    <img src={userData.avatar} alt="Фотография профиля" className="profile__image" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__container-info">
                <div className="profile__container-name">
                    <h1 className="profile__name">{userData.name}</h1>
                    <button aria-label="Изменение имени и описания профиля" type="button" className="profile__redact" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__description">{userData.about}</p>
                </div>
            </div>
            <button aria-label="Добавление карточек с местами" type="button" className="profile__add-profile" onClick={props.onAddPlace}></button>
            </section>
    
            <section className="places">
            <ul className="places__cards">
                {props.initialCards.map((card) => (
                    <Card
                        openedCard={card}
                        onCardClick={props.сardClick}
                        cardName={card.name}
                        cardImage={card.link}
                        key={card._id}
                        cardLikes={card.likes}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                    )
                )}
            </ul>
            </section>
        </main>
    );
}
export default Main;