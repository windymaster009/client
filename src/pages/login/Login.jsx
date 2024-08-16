import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from 'react-google-login';
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleGoogleSuccess = async (response) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/google", { token: response.tokenId });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google Login Failed", response);
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1 className="lTitle">Login</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
          value={credentials.username}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
          value={credentials.password}
        />
        <div className="buttonContainer">
          <button
            disabled={loading}
            onClick={handleClick}
            className="lButton"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="lButton registerButton"
          >
            Register
          </button>
        </div>
        <div className="forgotPassword">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        {error && <span className="lError">{error.message}</span>}
        <div className="googleLogin">
          <GoogleLogin
            clientId="1024106569318-5hlbu74tfugfq5n3sm4ihai22vtjr16o.apps.googleusercontent.com" // Replace with your Google Client ID            buttonText="Login with Google"
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

export default Login;
