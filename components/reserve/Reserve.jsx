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
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const { data, loading, error } = useFetch(`/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle room type selection
  const handleSelect = (roomType) => {
    setSelectedRoomType((prev) => (prev === roomType ? null : roomType));
  };

  const handleReserveAll = async () => {
    try {
      if (!selectedRoomType) return;

      const reservationData = {
        user: user._id,
        hotel: hotelId,
        roomType: selectedRoomType, // Reserve by room type
        checkInDate: dates[0].startDate,
        checkOutDate: dates[0].endDate,
        guests: 2, // Update dynamically if required
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

  // Group rooms by title (type)
  const groupedRooms = data?.data?.reduce((acc, room) => {
    if (!acc[room.title]) {
      acc[room.title] = room; // Use the first room object for type details
    }
    return acc;
  }, {});

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        {groupedRooms && Object.values(groupedRooms).length > 0 ? (
          Object.values(groupedRooms).map((room) => (
            <div key={room._id} className="rItem">
              <div className="rItemInfo">
                <span className="rTitle">{room.title}</span>
                <span className="rDesc">{room.desc}</span>
                <span className="rMax">Max people: {room.maxPeople}</span>
                <span className="rPrice">${room.price}</span>
                {/* Button to reserve/unreserve */}
                <button
                  className="rButton"
                  onClick={() => handleSelect(room.title)}
                >
                  {selectedRoomType === room.title ? "Unreserve" : "Reserve"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No rooms available for this hotel.</div>
        )}
        <button
          className="rButton"
          onClick={handleReserveAll}
          disabled={!selectedRoomType}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default Reserve;
