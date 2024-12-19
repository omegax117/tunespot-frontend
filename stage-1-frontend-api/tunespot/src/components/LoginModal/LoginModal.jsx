import { useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  onCloseModal,
  onLogin,
  switchModal,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Logging in" : "Login"}
      title="Log In"
      closeActiveModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      switchTitle={"Register"}
      switchModal={switchModal}
    >
      <label htmlFor="EmailLogin" className="modal__label">
        Email*{" "}
        <input
          type="email"
          id="EmailLogin"
          placeholder="Email"
          className="modal__input"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="PasswordLogin" className="modal__label">
        Password*{" "}
        <input
          type="password"
          id="PasswordLogin"
          placeholder="Password"
          className="modal__input"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
