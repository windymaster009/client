import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext); // Use AuthContext to get user
  const navigate = useNavigate();

  // State to handle success or failure messages
  const [message, setMessage] = useState(null); // This will store the message string
  const [messageType, setMessageType] = useState(""); // 'success' or 'error' to style message

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    const numOfNights = alldates.length;
    const roomPrice = data.reduce((total, item) => {
      return total + item.price * selectedRooms.length;
    }, 0);

    return roomPrice * numOfNights;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );

      const reservationData = {
        user: user._id, // Use user ID from AuthContext
        hotel: hotelId,
        room: selectedRooms[0],
        checkInDate: dates[0].startDate,
        checkOutDate: dates[0].endDate,
        guests: 2, // Adjust as needed
        status: "pending",
      };

      await axios.post("/reservations", reservationData);

      setMessage("Reservation successful!");
      setMessageType("success");
      setOpen(false);
      navigate("/reservation-success");

    } catch (err) {
      console.error("Reservation failed:", err.response ? err.response.data : err.message);
      setMessage("Reservation failed. Please try again.");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="totalPrice">
          <span>Total Price: ${calculateTotalPrice()}</span>
        </div>
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>

        {/* Display the success or error message */}
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;
