import { Link } from "react-router-dom";
import notFound from "../error.svg";

const NotFound = () => {
  return (
    <section className="container not-found">
      <img src={notFound} alt="not found" />
      <p>Sorry, not found!</p>
      <Link className="btn" to="/">
        Back home
      </Link>
    </section>
  );
};

export default NotFound;
