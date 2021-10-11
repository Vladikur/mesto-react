import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');
    const [validationName, setValidationName] = React.useState('');
    const [validationLink, setValidationLink] = React.useState('');

    function handleChangeName(e) {
        setCardName(e.target.value)
        setValidationName(e.target.validationMessage)
    }

    function handleChangeLink(e) {
        setCardLink(e.target.value)
        setValidationLink(e.target.validationMessage)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: cardName,
            link: cardLink,
        });
        setCardName('')
        setCardLink('')
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText={`${props.saving ? 'Создание...' : 'Создать'}`} title="Новое место" name="add-card" isOpen={props.isOpen} closePopup={props.closePopup} >
            <section className="popup__input-element">
                <input value={cardName || ''} onChange={handleChangeName} id="sing-in-place" type="text" placeholder="Название" name="place" className="popup__input popup__input_change_name-card" required minLength="2" maxLength="30" />
                <span className="popup__input-error" id="sing-in-place-error">{validationName}</span>
            </section>
            <section className="popup__input-element">
               <input value={cardLink || ''} onChange={handleChangeLink} id="sing-in-url" type="url" placeholder="Ссылка на картинку" name="url" className="popup__input popup__input_change_src" required />
              <span className="popup__input-error" id="sing-in-url-error">{validationLink}</span>
            </section>
        </PopupWithForm>
    );
}
export default AddPlacePopup;