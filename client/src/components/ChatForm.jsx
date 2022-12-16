import { useRef } from "react";
import { useSocket } from "../context";
import { FaPaperPlane } from "react-icons/fa";

const ChatForm = () => {
  const { sendMessage } = useSocket();
  const messageRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (!message) return;
    sendMessage(message);
    messageRef.current.value = "";
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        ref={messageRef}
        type="text"
        name="message"
        placeholder="Say something..."
        aria-label="Enter message"
        autoComplete="off"
        required
        aria-required="true"
        autoFocus
      />
      <button type="submit" className="btn" aria-label="send">
        <span className="btn-label">send</span>
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default ChatForm;
