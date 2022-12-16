import { useRef, useEffect } from "react";
import { useSocket } from "../context";
import { FaComments } from "react-icons/fa";
import { createSearchParams } from "react-router-dom";

const Join = () => {
  const { join, navigate, error, setError } = useSocket();
  const usernameRef = useRef(null);
  const roomRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const room = roomRef.current.value;
    join({ username, room });
    if (error || !username || !room) return;
    navigate({
      pathname: "/chat",
      search: `${createSearchParams({ username, room })}`
    });
  };
  return (
    <section className="container">
      <section className="section">
        <h1 className="title">
          <span role="img" aria-hidden="true">
            <FaComments />
          </span>
          ChatRoom
        </h1>
        <section className="form-container">
          <form className="join-form" onSubmit={handleSubmit}>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Username..."
              aria-label="Username"
              aria-required="true"
              autoFocus
              // required
            />
            <input
              ref={roomRef}
              type="text"
              name="room"
              placeholder="Room name..."
              aria-label="Room name"
              aria-required="true"
              // required
            />
            {error && <p className="error">{error}</p>}

            <button type="submit" className="btn">
              join
            </button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Join;
