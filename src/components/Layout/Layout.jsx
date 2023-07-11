import Logo from "components/Logo/Logo";
import Avi from "assets/profile-photo.png";

import "./style.scss";
import icons from "assets/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const { username } = JSON.parse(sessionStorage.getItem("user")) || {};
    if (!username) {
      navigate(ROUTES.login);
    }
  }, [navigate]);

  const logout = () => {
    sessionStorage.clear();
    navigate(ROUTES.login);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="bg-white main-layout" onClick={hideDropdown}>
      <div className="main-layout__nav">
        <div className="main-layout__nav__inner">
          <Logo />
          <div className="dropdown">
            <img
              src={Avi}
              alt="profile"
              className="cursor-pointer dropdown-toggle"
              width={32}
              height={32}
              onClick={toggleDropdown}
            />
            {showDropdown ? (
              <ul className="dropdown-menu">
                <li>
                  <div className="dropdown-item cursor-pointer" onClick={logout}>
                    Logout
                  </div>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      <div className="main-layout__inner">{children}</div>
      <div className="main-layout__footer">
        <NavLink to={ROUTES.dashboard}>
          <div
            className={`main-layout__footer__item ${
              pathname === ROUTES.dashboard ? "active" : ""
            }`}>
            {icons.home}
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink to={ROUTES.payments}>
          <div
            className={`main-layout__footer__item ${
              pathname === ROUTES.payments ? "active" : ""
            }`}>
            {icons.payments}
            <p>Payment</p>
          </div>
        </NavLink>
        <NavLink to={ROUTES.dashboard}>
          <div className="main-layout__footer__item">
            {icons.more}
            <p>More</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Layout;
