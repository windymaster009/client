import { faBed, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerbar.css";
import { DateRange } from "react-date-range";
import { useContext, useState, useEffect, useRef } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Headerbar = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);
  const dropdownRef = useRef(null);

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const destinations = [
    { title: "Phnom Penh", img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/529234280.jpg?k=474b11a0f19ada6f117015ef94165bccb6d43ff35a9ca61fd0714f07156b9129&o=&hp=1", flag: "https://cdn-icons-png.flaticon.com/512/6735/6735694.png" },
    { title: "Siem Reap", img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/529234280.jpg?k=474b11a0f19ada6f117015ef94165bccb6d43ff35a9ca61fd0714f07156b9129&o=&hp=1", flag: "https://cdn-icons-png.flaticon.com/512/6735/6735694.png" },
    { title: "Bangkok", img: "https://www.lamabooking.com/images/destinations/bangkok.jpg", flag: "https://cdn-icons-png.flaticon.com/512/6735/6735694.png" },
    { title: "Sihanoukville", img: "https://www.lamabooking.com/images/destinations/sihanoukville.jpg", flag: "https://cdn-icons-png.flaticon.com/512/6735/6735694.png" },
    { title: "Kampot", img: "https://www.lamabooking.com/images/destinations/kampot.jpg", flag: "https://cdn-icons-png.flaticon.com/512/6735/6735694.png" },
  ];

  const texts = [
    "A lifetime of discounts? It's Genius.",
    "Discover amazing places with great deals.",
    "Unlock instant savings of 10% or more.",
    "Get a discount with the hotel owners.",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">{texts[currentTextIndex]}</h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account
            </p>
            {!user && <button className="headerBtn">Please login for booking</button>}
           
          </>
        )}
      </div>
    </div>
  );
};

export default Headerbar;
