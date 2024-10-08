// src/components/reservationSuccess/ReservationSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ReservationSuccess.css'; // Optional for styling

const ReservationSuccess = () => {
  return (
    <div className="reservation-success-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Reservation Successful!</h1>
      <p>Your reservation has been successfully placed. Thank you for choosing us!</p>
      <div className="reservation-success-buttons">
        <Link to="/reservations">
          <button className="success-button">View Reservations</button>
        </Link>
        <Link to="/">
          <button className="success-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ReservationSuccess;
