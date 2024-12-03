// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ReservationHistory = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await axios.get('/reservations', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessoken')}`,
//           },
//         });
//         console.log(response.data); // Check the response data in the console
//         setReservations(response.data.data); // Ensure we're accessing the 'data' array
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch reservation history');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchReservations();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Reservation History</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>User</th> {/* Column for user */}
//             <th>Hotel</th>
//             <th>Rooms</th> {/* Column for room details */}
//             <th>Check-In Date</th>
//             <th>Check-Out Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reservations.map((reservation) => (
//             <tr key={reservation._id}>
//               <td>
//                 {/* Display user details */}
//                 {reservation.user ? (
//                   <span>
//                     {reservation.user.username} <br />
//                     {reservation.user.email}
//                   </span>
//                 ) : (
//                   'User not found'
//                 )}
//               </td>
//               <td>
//                 {reservation.hotel ? reservation.hotel.name : 'Hotel not found'}
//               </td>
//               <td>
//                 {/* Display room details with room names and IDs */}
//                 {reservation.rooms && reservation.rooms.length > 0
//                   ? reservation.rooms.map((room) => (
//                       <div key={room._id}>
//                         <strong>{room.name}</strong> (ID: {room._id})
//                       </div>
//                     ))
//                   : 'No rooms available'}
//               </td>
//               <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
//               <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
//               <td>{reservation.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationHistory;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/Headerbar";
import Navbar from "../components/navbar/Navbar";
import MailList from "../components/mailList/MailList";
import "./ReservationHistory.css";

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the userId and hotelId from localStorage
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage after login
  const hotelId = localStorage.getItem("hotelId"); // Assuming hotelId is stored in localStorage or passed as needed

  useEffect(() => {
    // Check if userId and hotelId are available
    if (!userId || !hotelId) {
      setError("User ID or Hotel ID is missing. Please log in and try again.");
      setLoading(false);
      return;
    }

    // Make the API call to fetch booking history
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/reservations/history/${userId}/${hotelId}`
        );
        setReservations(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching booking history.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId, hotelId]);

  const handleCancel = (id) => {
    alert(`Cancel reservation ID: ${id}`);
  };

  const handleDetail = (id) => {
    alert(`View details for reservation ID: ${id}`);
  };

  return (
    <div>
      <Navbar />
      <Header />

      <div className="reservation-container">
        <h2>Reservations</h2>

        {/* Display loading spinner or error message */}
        {loading && <p>Loading reservations...</p>}
        {error && <p>{error}</p>}

        <table className="reservation-table">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.hotel}</td>
                <td>
                  {reservation.rooms
                    .map((room) => room.title)
                    .join(", ")}
                </td>
                <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
                <td
                  className={`status ${
                    reservation.status === "OK" ? "status-ok" : "status-canceled"
                  }`}
                >
                  {reservation.status}
                </td>
                <td className="action-buttons">
                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(reservation._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="detail-button"
                    onClick={() => handleDetail(reservation._id)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MailList />
    </div>
  );
};

export default ReservationTable;
