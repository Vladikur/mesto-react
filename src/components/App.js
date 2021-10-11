import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import RemoveCardPopup from './RemoveCardPopup';
import ImagePopup from './ImagePopup';
import apiMesto from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({name: '', abaut: '', avatar: '', _id: ''});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    apiMesto
    .getProfileData()
    .then (data => {
      if(data) {
        setCurrentUser(data)
      }
    })
    .catch(err => console.log(err))
  }, []);



  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    if(isEditProfilePopupOpen){
      setIsEditProfilePopupOpen(false);
    }
    if(isEditAvatarPopupOpen){
      setIsEditAvatarPopupOpen(false);
    }
    if(isAddPlacePopupOpen){
      setIsAddPlacePopupOpen(false);
    }
    if(deleteCard){
      setDeleteCard(null);
    }
    if(selectedCard.link){
      setSelectedCard({name: '', link: ''});
    }
  }

  function handleUpdateUser(newDataUser) {
    setIsSaving(true)
    apiMesto
    .profileRedact(newDataUser)
    .then((data) => {
      setCurrentUser(data)
      setIsEditProfilePopupOpen(false)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsSaving(false)
    });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsSaving(true)
    apiMesto
    .avatarRedact(newAvatar)
    .then((data) => {
      setCurrentUser(data)
      setIsEditAvatarPopupOpen(false)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsSaving(false)
    });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsSaving(true)
    apiMesto
    .cardCreate(newCard)
    .then((data) => {
      setCards([data, ...cards]); 
      setIsAddPlacePopupOpen(false)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsSaving(false)
    });
  }

  React.useEffect(() => {
    apiMesto
    .getInitialCards()
    .then (data => {
        setCards(data)
    })
    .catch(err => console.log(err))
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    apiMesto
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err))
  }

  function handleRemoveCardSubmit() {
    setIsSaving(true)
    apiMesto
    .deleteCard(deleteCard._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== deleteCard._id));
      setDeleteCard(false)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsSaving(false)
    });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main
          initialCards={cards}
          onCardLike={handleCardLike}
          onCardDelete={setDeleteCard}
          сardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />

        <Footer />

        <EditProfilePopup
          saving={isSaving}
          onUpdateUser={handleUpdateUser} 
          isOpen={isEditProfilePopupOpen}
          closePopup={closeAllPopups}
        />
      
        <AddPlacePopup
          saving={isSaving}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          closePopup={closeAllPopups}
        />

        <EditAvatarPopup
          saving={isSaving}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          closePopup={closeAllPopups}
        />

        <RemoveCardPopup
          saving={isSaving}
          onRemoveCard={handleRemoveCardSubmit}
          isOpen={deleteCard}
          closePopup={closeAllPopups}
        />

        <ImagePopup
          cardName={selectedCard.name}
          cardLink={selectedCard.link}
          closePopup={closeAllPopups}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
