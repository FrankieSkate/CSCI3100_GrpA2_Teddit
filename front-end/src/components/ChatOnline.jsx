import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ChatOnline({ currentId }) {
  const token = useSelector(state => state.token);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `http://localhost:8002/users/${currentId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setFriends({ friends: data });
    };
    getFriends();
  }, []);

  console.log(friends);

  return (
    <div className="chatOnline">
      {friends.map((o, i) => (
        <div key={i} className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={`http://localhost:8002/assets/${o?.picturePath}`}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">
            {o?.firstName + " " + o?.lastName}
          </span>
        </div>
      ))}
    </div>
  );
}
