import { Fragment, useState } from "react";
import "./Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { type RouterProps } from "@/types";
import { RiCloseFill, RiMenu2Fill } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../../10_firebase/firebase.config";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const Routes: Array<RouterProps> = [
    {
      name: "All Movies",
      path: "/",
    },

    {
      name: "Watch List",
      path: "/watchlist",
    },
  ];

  const navigation__bar_toggle_class = isMenuOpen
    ? "visible__navbar"
    : "invisible__navbar";

  const handleMenuToogle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
    localStorage.removeItem("uid");
  };
  return (
    <>
      <header className="header__section">
        {isMenuOpen && (
          <div
            className="navigation__bar__closer"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        {isMenuOpen ? (
          <RiCloseFill className="menu__bar__icon" onClick={handleMenuToogle} />
        ) : (
          <RiMenu2Fill className="menu__bar__icon" onClick={handleMenuToogle} />
        )}
        <div className="logo">
          <Link to="/">
            <img src="/mymovie.png" alt="Logo" width={70} />
          </Link>
        </div>
        <nav className={`navigation__bar ${navigation__bar_toggle_class}`}>
          {Routes?.map((routeData) => (
            <Fragment key={routeData.name}>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={routeData.path}
                className={({ isActive }) =>
                  `${isActive ? "active" : "not__active"} anchor__tag ${
                    routeData.className
                  }`
                }
              >
                {routeData.name}
              </NavLink>
            </Fragment>
          ))}
        </nav>
        {auth?.currentUser?.uid && (
          <button onClick={handleLogout} className="btn__link">
            Logout
          </button>
        )}
      </header>
    </>
  );
}

export default Header;
