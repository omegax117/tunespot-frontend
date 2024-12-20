import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getArtist, getVideo } from "../../utils/AudioDBApi";
import { Footer } from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SearchModal from "../SearchModal/SearchModal";
import { setToken, getToken } from "../../utils/token";
import * as auth from "../../utils/auth";
import { AppContext } from "../../contexts/AppContext";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { Profile } from "../Profile/Profile";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  const navigate = useNavigate();

  function loadSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  //modal states
  const handleSearchClick = () => {
    setActiveModal("search");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const switchModal = () => {
    if (activeModal == "register") {
      setActiveModal("login");
    } else {
      setActiveModal("register");
    }
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUser(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setUserData(user);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleClickOff = (e) => {
      if (e.target.classList.contains("modal_opened")) closeActiveModal();
    };
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleClickOff);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleClickOff);
    };
  }, [activeModal]);

  // log/ register interactions
  const onRegister = ({ email, password, name, avatar }) => {
    const makeRequest = () => {
      if (email) {
        return auth.register({ email, password, name, avatar }).then(() => {
          setActiveModal("login");
        });
      }
    };
    loadSubmit(makeRequest);
  };

  const onLogin = ({ email, password }) => {
    const makeRequest = () => {
      if (!email || !password) {
        return;
      }
      return auth.login({ email, password }).then((data) => {
        if (data.token) {
          console.log(data.token);
          setToken(data.token);
          setIsLoggedIn(true);
          auth.getUser(data.token).then((user) => {
            setUserData(user);
            navigate("/profile");
          });
        }
      });
    };
    loadSubmit(makeRequest);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({});
    navigate("/");
  };

  // favorite interactions
  const addVideo = (values) => {
    setUserVideos([values, ...userVideos]);
  };

  const removeVideo = (card) => {
    const newUserVideos = userVideos.filter((item) => {
      return item.idTrack !== card.idTrack ? item : null;
    });
    setUserVideos(newUserVideos);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <div className="app">
          <Header
            login={handleLoginClick}
            register={handleRegisterClick}
            isLoggedIn={isLoggedIn}
            logout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  vid={getVideo}
                  openSearch={handleSearchClick}
                  getArtist={getArtist}
                  userVideos={userVideos}
                  addVideo={addVideo}
                  removeVideo={removeVideo}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    userVideos={userVideos}
                    isLoggedIn={isLoggedIn}
                    removeVideo={removeVideo}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <LoginModal
            onCloseModal={closeActiveModal}
            isOpen={activeModal === "login"}
            onLogin={onLogin}
            switchModal={switchModal}
            isLoading={isLoading}
          />
          <SearchModal
            onCloseModal={closeActiveModal}
            isOpen={activeModal === "search"}
            getVideo={getVideo}
            addVideo={addVideo}
            isLoggedIn={isLoggedIn}
          />
          <RegisterModal
            onCloseModal={closeActiveModal}
            onRegister={onRegister}
            isOpen={activeModal === "register"}
            switchModal={switchModal}
            isLoading={isLoading}
          />
          <Footer />
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
