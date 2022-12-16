import { useEffect } from "react";
import { useSocket } from "../context";
import Alert from "./Alert";
import Aside from "./Aside";
import ChatForm from "./ChatForm";
import MessageList from "./MessageList";
import Navbar from "./Navbar";

const Room = () => {
  const { isAlertOpen, searchParams, leave, reconnect, navigate } = useSocket();
  let usernameURL = searchParams.get("username");
  let roomURL = searchParams.get("room");

  const reconnectToRoom = () => {
    usernameURL = searchParams.get("username");
    roomURL = searchParams.get("room");
    // if (!usernameURL || !roomURL) {
    //   leave();
    //   return;
    // }
    reconnect({ usernameURL, roomURL });
  };

  useEffect(() => {
    window.addEventListener("load", reconnectToRoom);
    return () => {
      window.removeEventListener("load", reconnectToRoom);
    };
  }, []);
  useEffect(() => {
    document.title = roomURL;
    window.onfocus = () => {
      document.title = roomURL;
    };
  }, [roomURL]);

  return (
    <main className="room">
      {isAlertOpen && <Alert />}
      <Navbar />
      <main className="main-chat">
        <Aside />
        <MessageList />
      </main>
      <ChatForm />
    </main>
  );
};

export default Room;
