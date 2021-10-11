import React from 'react';
import PopupWithForm from './PopupWithForm';

function RemoveCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onRemoveCard()
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            buttonText={`${props.saving ? 'Удаление...' : 'Да'}`}
            title="Вы уверены?"
            name="delete-card"
            isOpen={props.isOpen}
            closePopup={props.closePopup} >
        </PopupWithForm>
    );
}
export default RemoveCardPopup;