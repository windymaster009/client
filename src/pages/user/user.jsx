import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import "./user.css";

const User = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [view, setView] = useState("edit");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username,
        email: user.email,
        currentPassword: "",
        newPassword: "",
      });
      fetchBookings();
      fetchWishlist();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/user/bookings/${user._id}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`/user/wishlist/${user._id}`);
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/update/${user._id}`, {
        username: userInfo.username,
        email: userInfo.email,
        currentPassword: userInfo.currentPassword,
        newPassword: userInfo.newPassword,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      alert("User information updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update user information.");
    }
  };

  const renderContent = () => {
    switch (view) {
      case "edit":
        return (
          <form className="userForm" onSubmit={handleUpdate}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              className="userInput"
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="userInput"
            />
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={userInfo.currentPassword}
              onChange={handleChange}
              className="userInput"
              placeholder="Enter current password"
            />
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={userInfo.newPassword}
              onChange={handleChange}
              className="userInput"
              placeholder="Enter new password"
            />
            <button type="submit" className="userButton">
              Update
            </button>
          </form>
        );
      case "booking":
        return (
          <div className="userBookings">
            <h3>Bookings</h3>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <ul>
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    <p>Hotel: {booking.hotelName}</p>
                    <p>Date: {booking.date}</p>
                    <p>Price: ${booking.price}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "wishlist":
        return (
          <div className="userWishlist">
            <h3>Wishlist</h3>
            {wishlist.length === 0 ? (
              <p>No wishlisted hotels found.</p>
            ) : (
              <ul>
                {wishlist.map((hotel) => (
                  <li key={hotel.id}>
                    <p>Hotel: {hotel.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user">
      <Navbar />
      <div className="userContainer">
        <div className="userLeft">
          <FaUserCircle className="userIcon" />
          <div className="userInfo">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
          <button className="userButton" onClick={() => setView("edit")}>
            Edit
          </button>
          <button className="userButton" onClick={() => setView("booking")}>
            Booking
          </button>
          <button className="userButton" onClick={() => setView("wishlist")}>
            Wishlist
          </button>
        </div>
        <div className="userRight">{renderContent()}</div>
      </div>
    </div>
  );
};

export default User;
