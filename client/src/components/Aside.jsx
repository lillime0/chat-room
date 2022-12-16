import { useSocket } from "../context";
import { FaTimes, FaUsers, FaUser } from "react-icons/fa";

const Aside = () => {
  const { isAsideOpen, closeAside, users, searchParams } = useSocket();
  let currentUser = searchParams.get("username");

  return (
    <aside className={`chat-aside ${isAsideOpen && "active-users"}`}>
      <button
        title="close aside"
        className="close-aside"
        aria-label="close icon"
        onClick={closeAside}
      >
        <FaTimes />
      </button>
      <h2 className="title">
        <span role="img" aria-label="users">
          {users.length === 1 ? <FaUser /> : <FaUsers />}
        </span>
        {users.length}
      </h2>
      <ul id="users">
        {users.map(user => {
          const isSentByCurrentUser = user.username === currentUser;

          return (
            <li
              key={user.id}
              className={`${isSentByCurrentUser ? "current-user" : ""}`}
            >
              {user.username}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
