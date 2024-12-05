import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={item.img && item.img[0] ? item.img[0] : "default-image.jpg"} 
        alt={item.name || "Hotel"}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name || "Hotel Name"}</h1>
        <span className="siDistance">
          {item.distance ? `Excellent location - ${item.distance}m from center` : "Location not available"}
        </span>
        <span className="siTaxiOp">For more information please click more </span>
        <span className="siSubtitle">{item.title || "No subtitle available"}</span>
        <span className="siFeatures">{item.desc || "No description available"}</span>
        <span className="siCancelOp">Free cancellation at any time contact Hotel owner to cancel</span>
        <span className="siPrice">Booking Price start from  ${item.cheapestPrice || "N/A"}</span>
        <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Click here for Booking</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
