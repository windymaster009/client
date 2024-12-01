import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/rooms/${hotelId}`); // Fetch rooms for the given hotelId
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Reservation logic
  const handleSelect = (roomId) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleReserveAll = async () => {
    try {
      const reservationData = {
        user: user._id,
        hotel: hotelId,
        rooms: selectedRooms,
        checkInDate: dates[0].startDate,
        checkOutDate: dates[0].endDate,
        guests: 2, // Example: set guests dynamically if needed
      };

      await axios.post(`/api/reservations`, reservationData);
      setOpen(false); // Close the reservation modal
      navigate("/reservation-success");
    } catch (err) {
      console.error("Reservation failed:", err.message);
    }
  };

  if (loading) return <div>Loading room data...</div>;
  if (error) return <div>Error fetching room data: {error.message}</div>;

  // Ensure `data` is valid and map over `data.data` (array of rooms)
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        {data && data.data && Array.isArray(data.data) && data.data.length > 0 ? (
          data.data.map((room) => (
            <div key={room._id} className="rItem">
              <div className="rItemInfo">
                <span className="rTitle">{room.title}</span>
                <span className="rDesc">{room.desc}</span>
                <span className="rMax">Max people: {room.maxPeople}</span>
                <span className="rPrice">${room.price}</span>
                {room.roomNumbers.map((roomNumber) => (
                  <div key={roomNumber._id} className="roomDetails">
                    <span>Room {roomNumber.number}</span>
                    <button
                      className="rButton"
                      onClick={() => handleSelect(roomNumber._id)}
                    >
                      {selectedRooms.includes(roomNumber._id) ? "Unselect" : "Select"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No rooms available for this hotel.</div>
        )}
        <button
          className="rButton"
          onClick={handleReserveAll}
          disabled={selectedRooms.length === 0}
        >
          Reserve Selected
        </button>
      </div>
    </div>
  );
};

export default Reserve;
