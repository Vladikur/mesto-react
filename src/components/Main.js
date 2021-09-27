import React from 'react';
import apiMesto from '../utils/api';
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = React.useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = React.useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = React.useState("./images/Profile-image.jpg");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        apiMesto
        .getProfileData()
        .then (data => {
            setUserName(data.name)
            setUserDescription(data.about)
            setUserAvatar(data.avatar)
        })
        .catch(err => console.log(err))
    }, []);
        
    React.useEffect(() => {
        apiMesto
        .getInitialCards()
        .then (data => {
            setCards(data)
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <main className="content">
            <section className="profile">
            <div className="profile__container">
                <div className="profile__image-container">
                    <button aria-label="Изменение имени и описания профиля" type="button" className="profile__image-redact"></button>
                    <img src={userAvatar} alt="Фотография профиля" className="profile__image" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__container-info">
                <div className="profile__container-name">
                    <h1 className="profile__name">{userName}</h1>
                    <button aria-label="Изменение имени и описания профиля" type="button" className="profile__redact" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__description">{userDescription}</p>
                </div>
            </div>
            <button aria-label="Добавление карточек с местами" type="button" className="profile__add-profile" onClick={props.onAddPlace}></button>
            </section>
    
            <section className="places">
            <ul className="places__cards">
                {cards.map((card) =>
                <Card
                    openedCard={card}
                    onCardClick={props.сardClick}
                    cardName={card.name}
                    cardImage={card.link}
                    key={card._id}
                    cardLikes={card.likes}
                />)}
            </ul>
            </section>
        </main>
    );
}
export default Main;