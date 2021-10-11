import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const userData = React.useContext(CurrentUserContext);

    const [name, setProfileName] = React.useState('');
    const [description, setProfileAbout] = React.useState('');
    const [validationName, setValidationName] = React.useState('');
    const [validationAbout, setValidationAbout] = React.useState('');

    React.useEffect(() => {
        setProfileName(userData.name);
        setProfileAbout(userData.about);
    }, [userData, props.isOpen]);

    function handleChangeName(e) {
        setProfileName(e.target.value)
        setValidationName(e.target.validationMessage)
    }

    function handleChangeAbout(e) {
        setProfileAbout(e.target.value)
        setValidationAbout(e.target.validationMessage)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText={`${props.saving ? 'Сохранение...' : 'Сохранить'}`} title="Редактировать профиль" name="edit" isOpen={props.isOpen} closePopup={props.closePopup} >
            <section className="popup__input-element">
                <input value={name || ''} onChange={handleChangeName} id="sing-in-name" type="text" placeholder="Имя" name="name" className="popup__input popup__input_change_name" required minLength="2" maxLength="40" />
                <span className="popup__input-error" id="sing-in-name-error">{validationName}</span>
            </section>
            <section className="popup__input-element">
                <input value={description || ''} onChange={handleChangeAbout} id="sing-in-description" type="text" placeholder="Описание" name="description" className="popup__input popup__input_change_description" required minLength="2" maxLength="200" />
                <span className="popup__input-error" id="sing-in-description-error">{validationAbout}</span>
            </section>
        </PopupWithForm>
    );
}
export default EditProfilePopup;