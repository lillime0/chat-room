import { useSocket } from "../context";
// import ReactEmoji from "react-emoji";
import Linkify from "linkify-react";

const Message = ({ text, name, time }) => {
  const { searchParams } = useSocket();
  const currentUser = searchParams.get("username");
  const isSentByCurrentUser = name === currentUser;

  return (
    <article
      className={`message ${
        name ? (isSentByCurrentUser ? "message-user" : "") : "bot-message"
      }`}
    >
      {name ? (
        isSentByCurrentUser ? (
          ""
        ) : (
          <div className="meta">
            <span className="user">{name}</span>
            <span className="time">{time}</span>
          </div>
        )
      ) : (
        ""
      )}
      <Linkify options={{ target: "blank" }}>
        {/* <p>{ReactEmoji.emojify(text)}</p> */}
        <p>{text}</p>
      </Linkify>
      {isSentByCurrentUser && <div className="user-meta">{time}</div>}
    </article>
  );
};

export default Message;
