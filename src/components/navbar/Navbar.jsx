import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { FaRegBell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="navItems">
          {user ? (
            <>
             <Link to="/partner-account" className="navButton partnerAccount">
                Partner Account
              </Link>
              <div className="navItem">
                <FaRegBell className="icon" />
                <span className="notification">2</span>
              </div>
             
              <div className="navItem user-dropdown" onClick={handleUserClick}>
                <FiUser className="icon" />
                {showDropdown && (
                  <div className="dropdown-menu">
                   
                    <button className="dropdown-item" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              <Link to="" style={{ color: "inherit", textDecoration: "none" }}>
                <span className="username">{user.username}</span>
              </Link>
            </>
          ) : (
            <div className="navItems">
              <Link to="/register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/partner-account">
                <button className="navButton">Partner Account</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
