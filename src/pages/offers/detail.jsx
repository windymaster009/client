import React from "react";
import "./detail.css";

const App = () => {
    return (
      <div className="container">
        <div className="card">
          <div className="card-icon">
            <img src="https://t-cf.bstatic.com/design-assets/assets/v3.122.0/illustrations-traveller/FreeCancellation.png" alt="Calendar Icon" />
          </div>
          <div className="card-text">
            <h3>Book now, pay at the property</h3>
            <p>FREE cancellation on most rooms</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon">
            <img src="https://t-cf.bstatic.com/design-assets/assets/v3.122.0/illustrations-traveller/TripsGlobe.png" alt="Globe Icon" />
          </div>
          <div className="card-text">
            <h3>2+ million properties worldwide</h3>
            <p>Hotels, guest houses, apartments, and more...</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon">
            <img src="https://t-cf.bstatic.com/design-assets/assets/v3.122.0/illustrations-traveller/CustomerSupport.png" alt="Customer Service Icon" />
          </div>
          <div className="card-text">
            <h3>Trusted customer service you can rely on, 24/7</h3>
            <p>We're always here to help</p>
          </div>
        </div>
      </div>
    );
  };

export default App;