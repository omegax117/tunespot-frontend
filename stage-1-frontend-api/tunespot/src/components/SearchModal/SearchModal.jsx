import { useEffect, useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import { VideoSection } from "../VideoSection/VideoSection";
import { Preloader } from "../Preloader/Preloader";

const SearchModal = ({
  isOpen,
  onCloseModal,
  isLoading,
  getVideo,
  addVideo,
  isLoggedIn,
}) => {
  const [video, setVideo] = useState("");
  const [results, setResults] = useState({ mvids: [] });

  const handleVideoChange = (e) => {
    setVideo(e.target.value);
  };

  const clearSearch = () => {
    setVideo("");
    setResults({ mvids: [] });
  };

  function handleVideoSubmit(e) {
    e.preventDefault();
    return getVideo(video).then((res) => setResults(res));
  }

  return (
    <>
      <ModalWithForm
        buttonText={isLoading ? "Searching" : "Search"}
        title="search"
        closeActiveModal={onCloseModal}
        isOpen={isOpen}
        onSubmit={handleVideoSubmit}
      >
        <label htmlFor="video" className="modal__label">
          Search videos by artist ID{" "}
          <input
            type="text"
            id="video"
            placeholder="artist ID"
            className="modal__input"
            value={video}
            onChange={handleVideoChange}
            required
          />
        </label>
        <button className="modal__clear" onClick={clearSearch}>
          CLEAR RESULTS
        </button>
        {isLoading ? (
          <Preloader></Preloader>
        ) : (
          <VideoSection
            addVideo={addVideo}
            videos={results}
            isLoggedIn={isLoggedIn}
          />
        )}
      </ModalWithForm>
    </>
  );
};

export default SearchModal;
