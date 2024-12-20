import { VideoCard } from "../VideoCard/VideoCard";

export function VideoSection({ videos, addVideo, isLoggedIn }) {
  //   const currentUser = useContext(CurrentUserContext);
  return (
    <div className="video-section">
      <div className="video-section__info">
        <h2 className="video-section__title">Search Results:</h2>
      </div>
      <ul className="video-section__list">
        {videos?.mvids?.length > 0 ? (
          videos.mvids.map((item) => (
            <VideoCard
              addOrRemove={addVideo}
              key={item.idTrack}
              item={item}
              btnText={"Add to your favorites"}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <p className="video-section__list">No videos found</p>
        )}
      </ul>
    </div>
  );
}
