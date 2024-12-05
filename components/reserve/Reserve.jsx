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
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const { data, loading, error } = useFetch(`/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle room selection
  const handleSelect = (roomId) => {
    setSelectedRoomId(roomId === selectedRoomId ? "" : roomId);
  };

  // Reserve selected room
  const handleReserve = async () => {
    try {
      if (!selectedRoomId) return;

      const reservationData = {
        user: user._id,
        roomId: selectedRoomId,
        checkInDate: dates[0]?.startDate,
        checkOutDate: dates[0]?.endDate,
        guests: 2, // Adjust as needed
      };

      // API call with hotelId as a route parameter
      await axios.post(
        `http://localhost:8800/api/reservations/${hotelId}`,
        reservationData
      );

      setOpen(false); // Close modal
      navigate("/reservation-success");
    } catch (err) {
      console.error("Reservation failed:", err.message);
    }
  };

  if (loading) return <div>Loading room data...</div>;
  if (error) return <div>Error fetching room data: {error.message}</div>;

  return (
    <div className="reserve">
      <div className="rContainer">
        {/* Close Button */}
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        {/* Title */}
        <h1 className="rTitle">Available Rooms</h1>

        {/* Room List */}
        {data?.data?.length > 0 ? (
          data.data.map((room) => (
            <div key={room._id} className="rItem">
              <div className="rItemInfo">
                <span className="rTitle">{room.title}</span>
                <span className="rDesc">{room.desc}</span>
                <span className="rMax">Max people: {room.maxPeople}</span>
                <span className="rPrice">${room.price}</span>
              </div>
              <button
                className={`rButton ${selectedRoomId === room._id ? "selected" : ""}`}
                onClick={() => handleSelect(room._id)}
              >
                {selectedRoomId === room._id ? "Selected" : "Reserve"}
              </button>
            </div>
          ))
        ) : (
          <div>No rooms available for this hotel.</div>
        )}

        {/* Confirm Button */}
        {selectedRoomId && (
          <button className="rConfirmButton" onClick={handleReserve}>
            Confirm Reservation
          </button>
        )}
      </div>
    </div>
  );
};

export default Reserve;
