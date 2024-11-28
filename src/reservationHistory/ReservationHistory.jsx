import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data); // Check the response data in the console
        setReservations(response.data.data); // Ensure we're accessing the 'data' array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reservation history');
        setLoading(false);
        console.error(err);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Reservation History</h2>
      <table>
        <thead>
          <tr>
            <th>User</th> {/* Column for user */}
            <th>Hotel</th>
            <th>Rooms</th> {/* Column for room details */}
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>
                {/* Display user details */}
                {reservation.user ? (
                  <span>
                    {reservation.user.username} <br />
                    {reservation.user.email}
                  </span>
                ) : (
                  'User not found'
                )}
              </td>
              <td>
                {reservation.hotel ? reservation.hotel.name : 'Hotel not found'}
              </td>
              <td>
                {/* Display room details with room names and IDs */}
                {reservation.rooms && reservation.rooms.length > 0
                  ? reservation.rooms.map((room) => (
                      <div key={room._id}>
                        <strong>{room.name}</strong> (ID: {room._id})
                      </div>
                    ))
                  : 'No rooms available'}
              </td>
              <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
              <td>{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationHistory;
