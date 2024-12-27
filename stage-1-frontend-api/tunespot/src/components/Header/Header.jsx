import { useContext } from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Header({ login, register, isLoggedIn, logout }) {
  const user = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="tuneSpot logo" className="header__logo" />
      </Link>
      {isLoggedIn ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__user-name">{user.name}</p>
          </div>
        </Link>
      ) : (
        <p className="header__user-name"></p>
      )}
      {isLoggedIn ? (
        <>
          <button className="header__btn" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button className="header__btn" onClick={register}>
            Sign Up
          </button>
          <button className="header__btn" onClick={login}>
            Log In
          </button>
        </>
      )}
    </header>
  );
}
