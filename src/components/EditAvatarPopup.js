import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    
    const [avatar, setAvatar] = React.useState('');
    const [validationAvatar, setValidationAvatar] = React.useState('');

    function handleSubmit(e) {
      e.preventDefault();
      
      props.onUpdateAvatar({
        avatar: avatar,
      });

      setAvatar('')

    }

    function handleChangeAvatar(e) {
      setAvatar(e.target.value)
      setValidationAvatar(e.target.validationMessage)
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText={`${props.saving ? 'Сохранение...' : 'Сохранить'}`} title="Обновить аватар" name="add-avatar" isOpen={props.isOpen} closePopup={props.closePopup} >
          <section className="popup__input-element">
            <input value={avatar || ''} onChange={handleChangeAvatar} id="avatar-url" type="url" placeholder="Ссылка на картинку" name="avatar" className="popup__input popup__input_change_avatar" required />
            <span className="popup__input-error" id="avatar-url-error">{validationAvatar}</span>
          </section>
        </PopupWithForm>
    );
}
export default EditAvatarPopup;
