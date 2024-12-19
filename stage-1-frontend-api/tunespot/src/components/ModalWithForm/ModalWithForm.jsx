import "./ModalWithForm.css";

export function ModalWithForm({
  children,
  buttonText,
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
  switchTitle,
  switchModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={closeActiveModal}
          className="modal__close"
          id="close-btn"
        >
          X
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div>
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {switchTitle ? (
              <button
                type="button"
                onClick={switchModal}
                className="modal__alt"
              >
                or {switchTitle}
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
