import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ListYourProperty.css'; // Include custom styles

const ListYourProperty = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const handleGetStartedClick = () => {
        navigate('/parterregister');
      };
    return (
        <div>

            <Navbar />
            {/* <Header /> */}

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
                        <button className="register-button" onClick={handleGetStartedClick}>
              Get started now →
            </button>
                        <div className="continue-registration">
                            <p>Already started a registration?</p>
                            <a href="/register">Continue your registration</a>
                        </div>
                    </div>
                </div>




            </div>
            <div>
                <div className="peace-of-mind-section">
                    <h2>List with peace of mind</h2>
                    <div className="benefits-list">
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Damage payments</h3>
                                <p>
                                    Our <a href="#">damage programme</a> covers your property in case of damages.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Your own house rules</h3>
                                <p>
                                    Communicate your house rules to potential guests who must agree to them in order to book.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Choose how you prefer to receive bookings</h3>
                                <p>
                                    Either by letting guests book instantly, or by <a href="#">reviewing booking requests</a> before accepting them.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Protection from liability claims</h3>
                                <p>
                                    Receive <a href="#">protection against liability claims</a> from guests and neighbours of up to €/£/$1,000,000 for each reservation.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Get paid consistently and securely</h3>
                                <p>
                                    Get guaranteed payouts and fraud protection through <a href="#">Payments by Booking.com</a>.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Verified guests</h3>
                                <p>
                                    We verify guests' email addresses and credit cards for partners on Payments by Booking.com.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <span className="checkmark">✔️</span>
                            <div className="benefit-details">
                                <h3>Robust support</h3>
                                <p>
                                    Access support in 45 languages and manage your property through Pulse, our app for partners like you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stand-out-section">
                    <h2>Stand out from the start</h2>
                    <div className="benefits-list">
                        <div className="benefit-item">
                            <img src="https://t-cf.bstatic.com/design-assets/assets/v3.125.0/illustrations-partner-thumbnails/Review.png" alt="Import reviews" className="benefit-icon" />
                            <div className="benefit-details">
                                <h3>Import your reviews</h3>
                                <p>
                                    We import your review score from other platforms and display it on your Booking.com property page, so you don’t start at zero reviews.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <img src="https://t-cf.bstatic.com/design-assets/assets/v3.125.0/illustrations-partner-thumbnails/Puzzle.png" alt="Import property details" className="benefit-icon" />
                            <div className="benefit-details">
                                <h3>Import your property details</h3>
                                <p>
                                    Seamlessly import your property details and sync your availability calendar with other platforms to make it easy to list and avoid double bookings.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <img src="https://t-cf.bstatic.com/design-assets/assets/v3.125.0/illustrations-partner-thumbnails/Search.png" alt="Stand out in the market" className="benefit-icon" />
                            <div className="benefit-details">
                                <h3>Stand out in the market</h3>
                                <p>
                                    The ‘New to Booking.com’ label helps you stand out in our search results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>




    );
};

export default ListYourProperty;
