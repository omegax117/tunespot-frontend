import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { VideoCard } from "../VideoCard/VideoCard";

export function Profile({ userVideos, removeVideo, isLoggedIn }) {
  const user = useContext(CurrentUserContext);
  const thisUserVideos = userVideos.filter((item) => item.owner === user._id);
  return (
    <div className="profile">
      <img
        className="profile__avatar"
        src={user.avatar}
        alt="profile_picture"
      />
      <h2>{user.name}</h2>
      <section>
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
      </section>
    </div>
  );
}
