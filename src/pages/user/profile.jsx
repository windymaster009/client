import React from "react";
import "./profile.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    return (
        <div className="account-settings">
            <h1>Account settings</h1>
            <p>Manage your Booking experience</p>

            <div className="settings-container">
                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="content">
                        <h2>Personal details</h2>
                        <p>Update your information and find out how it's used.</p>
                        <a href="#" className="manage-link">Manage personal details</a>
                    </div>
                </div>

                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-cog"></i>
                    </div>
                    <div className="content">
                        <h2>Preferences</h2>
                        <p>Change your language, currency and accessibility requirements.</p>
                        <a href="#" className="manage-link">Manage preferences</a>
                    </div>
                </div>

                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="content">
                        <h2>Security</h2>
                        <p>Change your security settings, set up secure authentication or delete your account.</p>
                        <a href="#" className="manage-link">Manage account security</a>
                    </div>
                </div>

                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-credit-card"></i>
                    </div>
                    <div className="content">
                        <h2>Payment details</h2>
                        <p>Securely add or remove payment methods to make it easier when you book.</p>
                        <a href="#" className="manage-link">Manage payment details</a>
                    </div>
                </div>

                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="content">
                        <h2>Privacy</h2>
                        <p>Exercise your privacy rights and control how your data is used.</p>
                        <a href="#" className="manage-link">Manage privacy</a>
                    </div>
                </div>

                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-bell"></i>
                    </div>
                    <div className="content">
                        <h2>Email notifications</h2>
                        <p>Decide what you want to be notified about, and unsubscribe from what you don't.</p>
                        <a href="#" className="manage-link">Manage notifications</a>
                    </div>
                </div>

                <div className="setting">
                    <div className="icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="content">
                        <h2>Other travellers</h2>
                        <p>Add or edit information about the people you're travelling with.</p>
                        <a href="#" className="manage-link">Manage travellers</a>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-links">
                    <a href="#">About Booking.com</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">How we work</a>
                    <a href="#">Privacy & Cookie Statement</a>
                    <a href="#">Help Centre</a>
                </div>
                <p>Copyright © 1996–2024 Cambodiabooking.com™. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
