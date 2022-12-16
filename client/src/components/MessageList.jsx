import { useRef, useEffect } from "react";
import { useSocket } from "../context";
import { FaAngleDoubleRight } from "react-icons/fa";
import Message from "./Message";
// import ScrollToBottom from "react-scroll-to-bottom";

const MessageList = () => {
  const { openAside, messages } = useSocket();
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <article className="chat-messages">
      <button
        title="active users"
        className="toggle-aside"
        aria-label="show users"
        onClick={openAside}
      >
        <FaAngleDoubleRight />
      </button>
      <article className="messages-edges">
        <article className="messages-container">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
          <div ref={messageEndRef} />
        </article>
      </article>
    </article>
  );
};

export default MessageList;
