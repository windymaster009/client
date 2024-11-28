import React, { useState } from 'react';
import './PartnerAccount.css';
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PartnerAccount = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(''); // State to handle any errors
  const [isSuccess, setIsSuccess] = useState(false); // State for success form
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error message
    setIsSuccess(false);  // Reset success state

    try {
      // Send POST request to backend to create a new PropertyOwner
      const response = await axios.post('propertyowners', {
        name,
        email,
        phone,
        address,
      });
      console.log("Submitted data:", response.data);
      setIsSuccess(true); // Set success state to true to show the success form
    } catch (error) {
      console.error('Error creating property owner:', error);
      setError(error.response?.data?.message || 'An error occurred'); // Handle errors
    }
  };

  const handleSignUpClick = () => {
    navigate("/register"); // Navigate to sign-up page if needed
  };

  return (
    <div className="partner-account-container">
      <Navbar />
      <div className="form-wrapper">
        <h1>Create Your Partner Account</h1>
        <p className="description">Create an account to list and manage your property.</p>

        {/* Show success form if submission is successful */}
        {isSuccess ? (
          <div className="success-form">
            <h2>Success!</h2>
            <p>Your partner account was created successfully.</p>
            <button onClick={() => setIsSuccess(false)}>Create Another Account</button>
          </div>
        ) : (
          // Main form for input if not successful
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button type="submit" className="continue-btn">Submit</button>
          </form>
        )}

        {error && <p className="error-message">{error}</p>}

        <p className="help-text">
          Do you have questions about your property or the extranet? Visit{' '}
          <a href="#">Partner Help</a> or ask another question on the{' '}
          <a href="#">Partner Community</a>.
        </p>

        <button className="sign-in-btn" onClick={handleSignUpClick}>
          Sign Up
        </button>

        <p className="terms-text">
          By signing in or creating an account, you agree with our{' '}
          <a href="#">Terms & Conditions</a> and{' '}
          <a href="#">Privacy Statement</a>.
        </p>

        <footer className="footer-text">
          <p>All rights reserved.</p>
          <p>Copyright (2006 - 2024) - Booking.com™</p>
        </footer>
      </div>
    </div>
  );
};

export default PartnerAccount;
