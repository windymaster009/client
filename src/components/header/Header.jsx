import { faBed, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState, useEffect, useRef } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
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
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                  onClick={() => setShowDropdown(true)}
                  value={destination}
                  aria-label="Search destination"
                />
                {showDropdown && (
                  <div className="dropdown" ref={dropdownRef}>
                    <ul>
                      {destinations.map((destination) => (
                        <li
                          key={destination.title}
                          onClick={() => {
                            setDestination(destination.title);
                            setShowDropdown(false);
                          }}
                        >
                          <img src={destination.flag} alt={`${destination.title} flag`} />
                          {destination.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
