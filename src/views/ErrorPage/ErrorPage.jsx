import BrokenLink from "assets/broken-link.svg";
import { NavLink } from "react-router-dom";
import { ROUTES } from "routes";

function ErrorPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3 vw-100 vh-100">
      <img src={BrokenLink} alt="broken link" />
      <h3 className="fw-bold">Ooops...looks like you got lost</h3>
      <NavLink to={ROUTES.dashboard} className="text-primary">
        Go to homepage
      </NavLink>
    </div>
  );
}

export default ErrorPage;
