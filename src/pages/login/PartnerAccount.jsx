import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PartnerAccount.css';
import Navbar from "../../components/navbar/Navbar";

const PartnerAccount = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission here (e.g., form validation, API call, etc.)
    console.log("Submitted email:", email);

    // Navigate to the /contact page after submission
    navigate('/contact');
  };

  return (
    <div className="partner-account-container">
      <div className="form-wrapper">
        <h1>Create your partner account</h1>
        <p>Create an account to list and manage your property.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <button type="submit" className="continue-btn">Continue</button>
        </form>

        <p className="help-text">
          Do you have questions about your property or the extranet? Visit{' '}
          <a href="#">Partner Help</a> or ask another question on the{' '}
          <a href="#">Partner Community</a>.
        </p>
        <button
            onClick={() => navigate("/")}
            className="rButton backButton"
          >
            Back to Home page
          </button>
        {/* <button onclick="/" className="sign-in-btn">Sign in</button> */}

        <p className="terms-text">
          By signing in or creating an account, you agree with our{' '}
          <a href="#">Terms & Conditions</a> and{' '}
          <a href="#">Privacy statement</a>.
        </p>
      </div>
    </div>
  );
};

export default PartnerAccount;

