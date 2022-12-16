import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

const AppContext = createContext();

const socket = io({ autoConnect: false });
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);
  const openAside = () => setIsAsideOpen(true);
  const closeAside = () => setIsAsideOpen(false);

  const sendMessage = msg => {
    socket.emit("chat message", msg);
  };
  const join = user => {
    socket.connect();
    socket.emit("join", user, err => {
      if (err) {
        setError(err);
        leave();
      }
    });
  };
  const reconnect = input => {
    if (socket.connected) return;
    join(input);
  };
  const leave = () => {
    socket.disconnect();
    navigate("/");
    setMessages([]);
    setUsers([]);
    setRoomName("");
    if (isAlertOpen) closeAlert();
    document.title = "ChatRoom";
  };
  const setupRoom = () => {
    socket.on("message", message => {
      if (!document.hasFocus()) {
        document.title = `New message...`;
      }
      setMessages(messages => [...messages, message]);
    });
    socket.on("room users", ({ users, room }) => {
      setUsers(users);
      setRoomName(room);
    });
  };
  useEffect(() => {
    setupRoom();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAlertOpen,
        openAlert,
        closeAlert,
        isAsideOpen,
        openAside,
        closeAside,
        sendMessage,
        users,
        messages,
        roomName,
        error,
        setError,
        searchParams,
        join,
        navigate,
        leave,
        reconnect
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useSocket = () => useContext(AppContext);
