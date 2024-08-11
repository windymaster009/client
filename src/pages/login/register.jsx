import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from 'react-google-login';
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    firstName: "",
    lastName: "",
    gender: "",
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
      await axios.post("/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post("/auth/google/register", { token: response.tokenId });
      navigate("/login");
    } catch (err) {
      console.error(err);
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
          placeholder="Username or Email"
          id="usernameOrEmail"
          onChange={handleChange}
          className="rInput"
          value={credentials.usernameOrEmail}
        />
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          onChange={handleChange}
          className="rInput"
          value={credentials.firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          onChange={handleChange}
          className="rInput"
          value={credentials.lastName}
        />
        <div className="genderContainer">
          <label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value="male"
              onChange={handleChange}
              className="rRadio"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value="female"
              onChange={handleChange}
              className="rRadio"
            />
            Female
          </label>
        </div>
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
        <div className="forgotPassword">
          <a href="/forgot-password">Forgot Password?</a>
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
