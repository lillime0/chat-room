import { useSocket } from "../context";
import { FaTimes } from "react-icons/fa";

const Alert = () => {
  const { closeAlert, leave } = useSocket();

  return (
    <div className="alert-overlay">
      <div className="alert" role="alert">
        <button
          title="close alert"
          className="close"
          aria-label="close icon"
          onClick={closeAlert}
        >
          <FaTimes />
        </button>
        <p>Are you sure you wanna leave?</p>
        <div className="btn-container">
          <button className="btn alert-btn alert-stay" onClick={closeAlert}>
            stay
          </button>
          <button className="btn alert-btn alert-leave" onClick={leave}>
            leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
