import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Helper function to generate all dates in a range
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    while (start <= end) {
      dates.push(new Date(start).getTime());
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // Check if the room is available for all selected dates
  const isAvailable = (roomNumber) => {
    return !roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
  };

  // Handle room selection
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
    );
  };

  // Handle reservation click
  const handleClick = async () => {
    if (selectedRooms.length === 0) {
      setMessage("Please select at least one room.");
      setMessageType("error");
      return;
    }
    
    setIsButtonDisabled(true);
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, { dates: alldates });
        })
      );

      const reservationData = {
        user: user._id,
        hotel: hotelId,
        rooms: selectedRooms,
        checkInDate: dates[0].startDate,
        checkOutDate: dates[0].endDate,
        guests: 2,
        status: "pending",
      };

      await axios.post("/reservations", reservationData);
      setMessage("Reservation successful!");
      setMessageType("success");
      setOpen(false);
      navigate("/reservation-success");
    } catch (err) {
      setMessage("Reservation failed. Please try again.");
      setMessageType("error");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
              <div className="rPrice">${item.price} per night</div>
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
        
        <div className="rSelectedRooms">
          <span>Selected Rooms: </span>
          <div className="selectedRoomsRow">
            {selectedRooms.map((roomId) => {
              const room = data.find((item) => item.roomNumbers.some((roomNumber) => roomNumber._id === roomId));
              const roomNumber = room?.roomNumbers.find((roomNumber) => roomNumber._id === roomId);
              return roomNumber ? (
                <div className="selectedRoom" key={roomId}>
                  <span>{roomNumber.number}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <button onClick={handleClick} className="rButton" disabled={isButtonDisabled}>
          Reserve Now!
        </button>
        <button onClick={() => setOpen(false)} className="cancelButton">
          Cancel
        </button>
      </div>

      {message && (
        <div className={`messagePopup ${messageType}`}>
          <div className="messageContent">
            <p>{message}</p>
            <button onClick={() => setMessage(null)} className="closeMessageBtn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;
