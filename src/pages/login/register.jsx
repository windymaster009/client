import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from 'react-google-login';
import "./register.css";


const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "", // Changed from usernameOrEmail to username
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/auth/register", credentials);
      console.log('Registration Success:', response.data);
      navigate("/login");
    } catch (err) {
      console.error('Registration Error:', err.response?.data || err.message);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post("/auth/google/register", { token: response.tokenId });
      navigate("/login");
    } catch (err) {
      console.error("Google Registration Failed", err);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google Registration Failed", response);
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h1 className="rTitle">Register</h1>
        <input
          type="text"
          placeholder="Username"
          id="username" // Changed id to match backend
          onChange={handleChange}
          className="rInput"
          value={credentials.username}
        />
        <input
          type="text"
          placeholder="Phone Number"
          id="phone"
          onChange={handleChange}
          className="rInput"
          value={credentials.phone}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="rInput"
          value={credentials.password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          onChange={handleChange}
          className="rInput"
          value={credentials.confirmPassword}
        />
        <div className="buttonContainer">
          <button
            disabled={loading}
            onClick={handleClick}
            className="rButton"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="rButton backButton"
          >
            Back to Login
          </button>
        </div>
        {error && <span className="rError">{error.message}</span>}
        <div className="googleRegister">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Register with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            className="googleButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
