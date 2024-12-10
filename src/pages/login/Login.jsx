import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [captchaState, setCaptchaState] = useState("initial"); // 'initial', 'loading', 'verified'

  const handleCaptchaClick = () => {
    if (captchaState === "initial") {
      setCaptchaState("loading"); // Start spinner animation
      setTimeout(() => {
        setCaptchaState("verified"); // Mark as verified after 10 seconds
        setCaptchaVerified(true);
      }, 10000); // 10 seconds
    }
  };
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify the CAPTCHA!");
      return;
    }
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
        {/* CAPTCHA Implementation */}
<div className="captchaContainer" onClick={handleCaptchaClick}>
  {captchaState === "initial" && (
    <div className="captchaBox">
      <span></span>
    </div>
  )}

  {captchaState === "loading" && (
    <div className="captchaSpinner">
      <div className="spinnerCircle"></div>
    </div>
  )}

  {captchaState === "verified" && (
    <div className="captchaBox checked">
      <span className="captchaCheckMark">✔</span>
    </div>
  )}

  <span className="captchaText">I'm not a robot</span>
  <div className="captchaLogo">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/640px-RecaptchaLogo.svg.png"
      alt="reCAPTCHA"
    />
  </div>
</div>

        <div className="buttonContainer">
          <button disabled={loading || !captchaVerified} onClick={handleClick} className="lButton">
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
