/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Conversation({ conversation, currentUserId }) {
  const [user, setUser] = useState(null);
  const token = useSelector(state => state.token);

  const friendId = conversation.members.find(m => m !== currentUserId);

  const getUser = async () => {
    const response = await fetch(`http://localhost:8002/users/${friendId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={`http://localhost:8002/assets/${user?.picturePath}`}
        alt=""
      />
      <span className="conversationName">
        {user?.firstName + " " + user?.lastName}
      </span>
    </div>
  );
}
