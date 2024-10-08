import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ContactDetails.css';

const ContactDetails = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+855'); // Default to Cambodia
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission here
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Phone Number:", `${countryCode} ${phoneNumber}`);
    };

    return (
        <div className="contact-details-container">
            <div className="form-wrapper">
                <h1>Contact details</h1>
                <p>Your full name and phone number are needed to ensure the security of your Booking.com account.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <label htmlFor="phoneNumber">Phone number</label>
                    <div className="phone-number-wrapper">
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="country-code"
                        >
                            <option value="+1">🇺🇸 (+1)</option>
                            <option value="+44">🇬🇧 (+44)</option>
                            <option value="+61">🇦🇺 (+61)</option>
                            <option value="+91">🇮🇳 (+91)</option>
                            <option value="+81">🇯🇵 (+81)</option>
                            <option value="+49">🇩🇪 (+49)</option>
                            <option value="+33">🇫🇷 (+33)</option>
                            <option value="+39">🇮🇹 (+39)</option>
                            <option value="+55">🇧🇷 (+55)</option>
                            <option value="+7">🇷🇺 (+7)</option>
                            <option value="+86">🇨🇳 (+86)</option>
                            <option value="+27">🇿🇦 (+27)</option>
                            <option value="+61">🇦🇺 (+61)</option>
                            <option value="+855">🇰🇭 (+855)</option>
                            <option value="+66">🇹🇭 (+66)</option>
                            <option value="+20">🇪🇬 (+20)</option>
                            <option value="+30">🇬🇷 (+30)</option>
                            <option value="+32">🇧🇪 (+32)</option>
                            {/* Add more country codes here */}
                        </select>

                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <p className="two-factor-text">
                        We'll text a two-factor authentication code to this number when you sign in.
                    </p>

                    <button type="submit" className="next-btn">Next</button>
                    <button
            onClick={() => navigate("/")}
            className="rButton backButton"
          >
            Back to Home page
          </button>
                    
                </form>

                <p className="terms-text">
                    By signing in or creating an account, you agree with our{' '}
                    <a href="#">Terms & conditions</a> and{' '}
                    <a href="#">Privacy statement</a>.
                </p>


            </div>
        </div>
    );
};

export default ContactDetails;
