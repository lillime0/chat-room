import { useSocket } from "../context";
import { FaComments, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { openAlert, roomName } = useSocket();

  return (
    <nav className="nav">
      <div className="logo-sec">
        <span className="logo" role="img" aria-hidden="true">
          <FaComments />
        </span>
        <span id="room-name">{roomName}</span>
      </div>
      <button id="leave" onClick={openAlert}>
        <span className="btn-label">Leave</span>

        <span className="leave-icon" role="img" aria-label="leave">
          <FaSignOutAlt />
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
