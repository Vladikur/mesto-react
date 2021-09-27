function ImagePopup(props) {

    return (
    <section className={`popup popup_type_image ${props.card ? 'popup_is-opened' : ''}`}>
        <div className="popup__photo-container">
            <button onClick={props.closePopup} aria-label="Закрыть просмотр фото" type="button" className="popup__exit-see-photo"></button>
            <img src={`${props.card.link}`} alt=" " className="popup__image-see-photo" />
            <h2 className="popup__text-see-photo">{props.card.name}</h2>
        </div>
    </section>
    );
}
export default ImagePopup;