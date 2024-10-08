import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FaUserCircle, FaLock, FaUserFriends, FaCreditCard, FaEnvelope, FaClipboardList, FaHeart } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import "./per-detail.css";

const User = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [view, setView] = useState("personalDetails");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    profilePicture: "",
    currentPassword: "",
    newPassword: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [nationalIdPreview, setNationalIdPreview] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username,
        email: user.email,
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
        phone: user.phone || "",
        profilePicture: user.profilePicture || "",
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

  const handlePasswordChangeInput = (e) => {
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Implement your password change logic here
    alert("Password changed successfully!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNationalIdPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = () => {
    // Implement your verification logic here
    alert("National ID verified successfully!");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/update/${user._id}`, {
        username: userInfo.username,
        email: userInfo.email,
        gender: userInfo.gender,
        dateOfBirth: userInfo.dateOfBirth,
        phone: userInfo.phone,
        profilePicture: userInfo.profilePicture,
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
      case "personalDetails":
        return (
          <div className="userContent">
            <div className="userContentHeader">
              <FaUserCircle className="userContentIcon" />
              <h3>Personal details</h3>
            </div>
            <p>Update your information and find out how it's used.</p>
            <form className="userForm" onSubmit={handleUpdate}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                className="userInput"
              />
              <label>Gender</label>
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
                className="userInput"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
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
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="userInput"
              />
              <label>Profile Picture</label>
              <input
                type="text"
                name="profilePicture"
                value={userInfo.profilePicture}
                onChange={handleChange}
                className="userInput"
                placeholder="Enter URL of your profile picture"
              />
              <button type="submit" className="userButton">
                Update
              </button>
            </form>
          </div>
        );
      case "security":
        return (
          <div className="userContent">
          <div className="userContentHeader">
            <FaLock className="userContentIcon" />
            <h3>Security</h3>
          </div>
          <p>Manage your security settings and protect your account.</p>

          {/* Change Password Section */}
          <div className="security-section">
            <h4>Change Password</h4>
            <form className="passwordForm" onSubmit={handlePasswordChange}>
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordInfo.oldPassword}
                onChange={handlePasswordChangeInput}
                className="userInput longInput"
                placeholder="Old Password"
              />
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordInfo.newPassword}
                onChange={handlePasswordChangeInput}
                className="userInput longInput"
                placeholder="New Password"
              />
              <button type="submit" className="userButton">Change Password</button>
            </form>
          </div>

          {/* Two-factor Authentication Section */}
          {/* <div className="security-section">
            <h4>Two-factor Authentication</h4>
            <button className="userButton">Set Up 2FA</button>
          </div> */}

          {/* Active Sessions Section */}
          {/* <div className="security-section">
            <h4>Active Sessions</h4>
            <button className="userButton">Sign Out of All Sessions</button>
          </div> */}

          {/* Delete Account Section */}
          {/* <div className="security-section">
            <h4>Delete Account</h4>
            <button className="deleteButton">Delete Account</button>
          </div> */}

          {/* Verify (National ID) Section */}
          {/* <div className="security-section">
            <h4>Verify (National ID)</h4>
            <input type="file" className="userInput" onChange={handleFileChange} />
            {nationalIdPreview && (
              <div className="image-preview">
                <img src={nationalIdPreview} alt="National ID Preview" />
                <button className="userButton" onClick={handleVerify}>Confirm</button>
              </div>
            )}
          </div> */}
        </div>
        );
      case "otherTravellers":
        return (
          <div className="userContent">
            <div className="userContentHeader">
              <FaUserFriends className="userContentIcon" />
              <h3>Other travellers</h3>
            </div>
            <p>Add or edit information about the people you're travelling with.</p>
            <button className="userButton">Manage travellers</button>
          </div>
        );
      case "paymentDetails":
        return (
          <div className="userContent">
            <div className="userContentHeader">
              <FaCreditCard className="userContentIcon" />
              <h3>Payment details</h3>
            </div>
            <p>Securely add or remove payment methods to make it easier when you book.</p>
            <button className="userButton">Manage payment details</button>
          </div>
        );
      case "emailNotifications":
        return (
          <div className="userContent">
            <div className="userContentHeader">
              <FaEnvelope className="userContentIcon" />
              <h3>Email notifications</h3>
            </div>
            <p>Decide what you want to be notified about, and unsubscribe from what you don't.</p>
            <button className="userButton">Manage notifications</button>
          </div>
        );
      case "booking":
        return (
          <div className="userContent">
            <div className="userContentHeader">
              <FaClipboardList className="userContentIcon" />
              <h3>Bookings</h3>
            </div>
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
          <div className="userContent">
            <div className="userContentHeader">
              <FaHeart className="userContentIcon" />
              <h3>Wishlist</h3>
            </div>
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
          <div className="userButtons">
            <button className="userButton" onClick={() => setView("personalDetails")}>
              Personal details
            </button>
            <button className="userButton" onClick={() => setView("security")}>
              Security
            </button>
            <button className="userButton" onClick={() => setView("otherTravellers")}>
              Other travellers
            </button>
            <button className="userButton" onClick={() => setView("paymentDetails")}>
              Payment details
            </button>
            <button className="userButton" onClick={() => setView("emailNotifications")}>
              Email notifications
            </button>
            <button className="userButton" onClick={() => setView("booking")}>
              Bookings
            </button>
            <button className="userButton" onClick={() => setView("wishlist")}>
              Wishlist
            </button>
          </div>
        </div>
        <div className="userRight">{renderContent()}</div>
      </div>
    </div>
  );
};

export default User;
