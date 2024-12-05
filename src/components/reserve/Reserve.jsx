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
  const [roomCount, setRoomCount] = useState(1);
  const [showError, setShowError] = useState(false); // State to control error pop-up
  const { data, loading, error } = useFetch(`/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReserve = async () => {
    try {
      if (!selectedRoomId || !dates[0]?.startDate || !dates[0]?.endDate) {
        setShowError(true);
        return;
      }

      const reservationData = {
        user: user._id,
        hotel: hotelId,
        rooms: Array(roomCount).fill(selectedRoomId),
        checkInDate: dates[0]?.startDate,
        checkOutDate: dates[0]?.endDate,
        guests: 2,
      };

      await axios.post(`/reservations/${hotelId}`, reservationData);
      setOpen(false);
      navigate(`/reservations/${hotelId}`);
    } catch (err) {
      console.error("Reservation failed:", err.response?.data || err.message);
      setShowError(true); // Show the error pop-up
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <h1 className="rTitle">Available Rooms</h1>

        {loading ? (
          <div>Loading rooms...</div>
        ) : error ? (
          <div>Error loading rooms. Please try again later.</div>
        ) : (
          <>
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
                    className={`rButton ${
                      selectedRoomId === room._id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRoomId(room._id)}
                  >
                    {selectedRoomId === room._id ? "Selected" : "Reserve"}
                  </button>
                </div>
              ))
            ) : (
              <div>No rooms available for this hotel.</div>
            )}

            {selectedRoomId && (
              <>
                <button className="rConfirmButton" onClick={handleReserve}>
                  Confirm Reservation
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Custom Error Pop-Up */}
      {showError && (
        <div className="errorPopup">
          <div className="errorPopupContent">
            <p>Please Select Other​ Rooms. Please try again.</p>
            <button onClick={() => setShowError(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;
