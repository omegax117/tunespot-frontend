export function VideoCard({ item, addOrRemove, btnText, isLoggedIn }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(item.strMusicVid, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <li className="video-card">
        <div className="video-card__title-wrapper">
          {item.strTrackThumb === null ? (
            <p onClick={handleClick} className="video-card__empty">
              No preview available
            </p>
          ) : (
            <img
              onClick={handleClick}
              className="video-card__img"
              src={item.strTrackThumb}
            />
          )}

          <h2 className="video-card__name">{item.strTrack}</h2>
          {isLoggedIn ? (
            <button
              className="video-card__btn"
              onClick={() => addOrRemove(item)}
            >
              {btnText}
            </button>
          ) : (
            <></>
          )}
        </div>
      </li>
    </>
  );
}
