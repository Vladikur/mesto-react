function PopupWithForm(props) {

    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`} >
            <div className="popup__container">
                <button  onClick={props.closePopup} aria-label="Закрыть редактирование профиля" type="button" className="popup__exit popup__exit-profile"></button>
                <h2 className="popup__text-redaction">{props.title}</h2>
                <form onSubmit={props.onSubmit} name={`${props.name}`} className="popup__form popup__form-profile">
                    {props.children}
                    <button type="submit" className="popup__save">{props.buttonText}</button>
                </form>
            </div>
        </section>
    );
}
export default PopupWithForm;