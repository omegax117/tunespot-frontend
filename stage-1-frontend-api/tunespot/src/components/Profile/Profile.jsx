import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { VideoCard } from "../VideoCard/VideoCard";

export function Profile({ userVideos, removeVideo, isLoggedIn }) {
  const user = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <img src={user.avatar} alt="profile_picture" />
      <h2>{user.name}</h2>
      <section>
        <ul className="main__cards">
          {userVideos.length > 0 ? (
            userVideos.map((item) => (
              <VideoCard
                key={item.idTrack}
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
