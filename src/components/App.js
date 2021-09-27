import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

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
    if(selectedCard.link){
      setSelectedCard({name: '', link: ''});
    }
  }

  return (
    <div className="page">
      <Header />

      <Main сardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />

      <Footer />

      <PopupWithForm buttonText="Сохранить" title="Редактировать профиль" name="edit" isOpen={isEditProfilePopupOpen} closePopup={closeAllPopups} >
        <section className="popup__input-element">
          <input id="sing-in-name" type="text" placeholder="Имя" name="name" className="popup__input popup__input_change_name" required minLength="2" maxLength="40" />
          <span className="popup__input-error" id="sing-in-name-error"></span>
        </section>
        <section className="popup__input-element">
          <input id="sing-in-description" type="text" placeholder="Описание" name="description" className="popup__input popup__input_change_description" required minLength="2" maxLength="200" />
          <span className="popup__input-error" id="sing-in-description-error"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm buttonText="Создать" title="Новое место" name="add-card" isOpen={isAddPlacePopupOpen} closePopup={closeAllPopups} >
        <section className="popup__input-element">
          <input id="sing-in-place" type="text" placeholder="Название" name="place" className="popup__input popup__input_change_name-card" required minLength="2" maxLength="30" />
          <span className="popup__input-error" id="sing-in-place-error"></span>
        </section>
        <section className="popup__input-element">
          <input id="sing-in-url" type="url" placeholder="Ссылка на картинку" name="url" className="popup__input popup__input_change_src" required />
          <span className="popup__input-error" id="sing-in-url-error"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm buttonText="Сохранить" title="Обновить аватар" name="add-avatar" isOpen={isEditAvatarPopupOpen} closePopup={closeAllPopups} >
        <section className="popup__input-element">
          <input id="avatar-url" type="url" placeholder="Ссылка на картинку" name="avatar" className="popup__input popup__input_change_avatar" required />
          <span className="popup__input-error" id="avatar-url-error"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm buttonText="Да" title="Вы уверены?" name="delete-card" />

      <ImagePopup cardName={selectedCard.name} cardLink={selectedCard.link} closePopup={closeAllPopups} />

    </div>
  );
}

export default App;
