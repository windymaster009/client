// import "./navbar.css";
// import { Link } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import logo from "../../assets/logo.png";
// import { FaRegBell } from "react-icons/fa";
// import { FiUser } from "react-icons/fi";
// import { BsFillFlagFill } from "react-icons/bs";

// const Navbar = () => {
//   const { user } = useContext(AuthContext);
//   const [scrolled, setScrolled] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleUserClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
//       <div className="navContainer">
//         <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
//           <img src={logo} alt="Logo" className="logo" />
//         </Link>
//         <div className="navItems">
//           <div className="navItem">
//             <BsFillFlagFill className="icon" />
//             <span className="navText">KHR</span>
//           </div>
//           <div className="navItem">
//             <BsFillFlagFill className="icon" />
//           </div>
//           <div className="navItem">
//             <FaRegBell className="icon" />
//             <span className="notification">2</span>
//           </div>
//           <div className="navItem user-dropdown" onClick={handleUserClick}>
//             <FiUser className="icon" />
//             {showDropdown && (
//               <div className="dropdown-menu">
//                 <Link to="/user" className="dropdown-item">
//                   Profile
//                 </Link>
//                 <Link to="/booking" className="dropdown-item">
//                   Booking
//                 </Link>
//                 <Link to="/signout" className="dropdown-item">
//                   Sign Out
//                 </Link>
//               </div>
//             )}
//           </div>
//           {user ? (
//             <Link to="/user" style={{ color: "inherit", textDecoration: "none" }}>
//               <span className="username">{user.username}</span>
//             </Link>
//           ) : (
//             <div className="navItems">
//               <Link to="/register">
//                 <button className="navButton">Register</button>
//               </Link>
//               <Link to="/login">
//                 <button className="navButton">Login</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

//===============

import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { FaRegBell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsFillFlagFill } from "react-icons/bs";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
          <div className="navItem">
            <BsFillFlagFill className="icon" />
            <span className="navText">KHR</span>
          </div>
          <div className="navItem">
            <BsFillFlagFill className="icon" />
          </div>
          <div className="navItem">
            <FaRegBell className="icon" />
            <span className="notification">2</span>
          </div>
          <div className="navItem user-dropdown" onClick={handleUserClick}>
            <FiUser className="icon" />
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/user" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/booking" className="dropdown-item">
                  Booking
                </Link>
                <button className="dropdown-item" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
          {user ? (
            <Link to="/user" style={{ color: "inherit", textDecoration: "none" }}>
              <span className="username">{user.username}</span>
            </Link>
          ) : (
            <div className="navItems">
              <Link to="/register">
                <button className="navButton">Register</button>
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
