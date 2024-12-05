import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationHistory = ({ userId, hotelId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/reservations/history/${userId}/${hotelId}`,
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        console.log('Response:', response.data); // Debugging

        setReservations(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reservation history');
        setLoading(false);
        console.error('Error:', err.response?.data || err.message || err);
      }
    };

    fetchReservations();
  }, [userId, hotelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Reservation History</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Hotel</th>
            <th>Rooms</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>
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
                {reservation.rooms && reservation.rooms.length > 0
                  ? reservation.rooms.map((room) => (
                      <div key={room.roomId}>
                        <strong>{room.title || 'Unknown Room'}</strong> (ID: {room.roomId})
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
