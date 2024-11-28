import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './ListYourProperty.css';

const ListYourProperty = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleGetStartedClick = () => {
        navigate("/partner-account"); // Navigate to PartnerAccount page on button click
    };

    return (
        <div>
            <Navbar />
            <div className="list-property-container">
                {/* Left Side: Main Heading and Subtext */}
                <div className="property-info">
                    <div className="header-section">
                        <h1>
                            List your <span className="highlight">apartment</span> on Booking.com
                        </h1>
                        <p>
                            Whether hosting is your sideline passion or full-time job, list your home today and quickly start earning more income.
                        </p>
                    </div>
                </div>

                {/* Right Side: Registration Panel */}
                <div className="registration-panel">
                    <div className="register-box">
                        <h2>Register for free</h2>
                        <ul className="register-benefits">
                            <li>✔️ 45% of hosts get their first booking within a week</li>
                            <li>✔️ Choose between instant bookings and booking requests</li>
                            <li>✔️ We handle payments for you</li>
                        </ul>
                        <button className="register-button" onClick={handleGetStartedClick}>Get started now →</button>
                        <div className="continue-registration">
                            <p>Already started a registration?</p>
                            <a href="/register">Continue your registration</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="peace-of-mind-section">
                {/* Other sections... */}
            </div>
        </div>
    );
};

export default ListYourProperty;
