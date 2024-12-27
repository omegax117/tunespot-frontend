import { useState, useContext } from "react";
import { VideoCard } from "../VideoCard/VideoCard";
import { demoItem } from "../../utils/demoItem";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main({
  openSearch,
  getArtist,
  userVideos,
  removeVideo,
  isLoggedIn,
}) {
  const [artist, setArtist] = useState("");
  const [id, setId] = useState("");
  const user = useContext(CurrentUserContext);
  const thisUserVideos = userVideos.filter((item) => item.owner === user._id);
  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  async function handleArtistSubmit(e) {
    e.preventDefault();
    ({ artist });
    let res = await getArtist(artist);
    setId(res);
  }

  return (
    <main className="main">
      {" "}
      <h1 className="main__title">TUNE SPOT</h1>
      <p className="main__intro">
        tuneSpot is a great place to build your own private collection of music
        videos by your favorite artists. Search an artist by name and use that
        ID # to find music videos. A free account is required.
      </p>
      {isLoggedIn ? (
        <>
          <form onSubmit={handleArtistSubmit} className="main__id-search">
            <label htmlFor="artist" className="modal__label">
              Search Artist ID{" "}
              <input
                type="text"
                id="artist"
                placeholder="Artist Name"
                className="main__input"
                value={artist}
                onChange={handleArtistChange}
                required
              />
            </label>
            <button className="main__btn">Find artist ID</button>
            <p className="main__result">ID:{id}</p>
          </form>

          <button className="main__btn main__search" onClick={openSearch}>
            Search Videos Now!
          </button>
          <ul className="main__cards">
            {thisUserVideos.length > 0 ? (
              thisUserVideos.map((item) => (
                <VideoCard
                  key={item.strTrack}
                  item={item}
                  addOrRemove={removeVideo}
                  btnText={"Remove from Favorites"}
                  isLoggedIn={isLoggedIn}
                />
              ))
            ) : (
              <p className="main__intro">No videos found</p>
            )}
          </ul>
        </>
      ) : (
        <>
          <h2 className="main__header">
            Here's a demo track to welcome you in:
          </h2>
          <VideoCard item={demoItem} isLoggedIn={isLoggedIn}></VideoCard>
        </>
      )}
    </main>
  );
}
