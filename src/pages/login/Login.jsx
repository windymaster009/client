import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
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
      console.error("Login Error:", err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/google", { token: credentialResponse.credential });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
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
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="lButton registerButton">
            Register
          </button>
        </div>
        <div className="forgotPassword">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        {error && <span className="lError">{error.message}</span>}
        <div className="googleLogin">
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.error("Google Login Failed")} />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
