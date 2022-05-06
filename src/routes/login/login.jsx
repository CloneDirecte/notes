import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function loginButton() {
    navigate("/", { state: { username: username, password: password } });
  }
  function buttonDisabler() {
    if (!username || !password) {
      return (
        <button className="login-button" disabled>
          Login
        </button>
      );
    } else {
      return (
        <button className="login-button" onClick={loginButton}>
          Login
        </button>
      );
    }
  }
  useEffect(() => {
    if (!location.state) {
      console.log("No state for " + location.pathname);
    } else if (location.state.error) {
      setErrorMessage(location.state.error);
    }
  }, [location.state]);
  return (
    <div className="center">
      <div className="login montserrat">
        <div className="login-inside">
          <h1 className="title">CloneDirecte</h1>
          <input
            className="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="error">{errorMessage}</span>
          {buttonDisabler()}
        </div>
      </div>
    </div>
  );
}
