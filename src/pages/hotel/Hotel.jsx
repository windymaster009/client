import "../hotel/hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Headerbar";
import MailList from "../../components/mailList/MailList";
import Reserve from "../../components/reserve/Reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleArrowLeft,
  // faCircleArrowRight,
  // faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useCallback, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract hotel ID from URL
  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/${id}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) =>
    Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / MILLISECONDS_PER_DAY);

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  const handleMove = (direction) => {
    const totalImages = data.photos?.length || 0;
    const newSlideNumber =
      direction === "l"
        ? (slideNumber - 1 + totalImages) % totalImages
        : (slideNumber + 1) % totalImages;
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "ArrowLeft") handleMove("l");
      if (e.key === "ArrowRight") handleMove("r");
    },
    [open, handleMove]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading hotel data: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>
            View Room
          </button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.location?.address || "Address not available"}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property to get more information.
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div
                key={i}
                className={`hotelImgWrapper ${i === slideNumber ? "active" : ""}`}
                onClick={() => handleOpen(i)}
              >
                <img src={photo} alt={`Thumbnail ${i + 1}`} className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h2 className="hotelDesc">{data.description}</h2>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <h2>${data.cheapestPrice * days}</h2>
              <button onClick={handleClick}>Reserve Now</button>
            </div>
          </div>
        </div>
      </div>
      <MailList />
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
