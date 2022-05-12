import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { login } from "ed-notes";

export default function App() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    } else if (location.state.username && location.state.password) {
      loginCallback(location.state.username, location.state.password);
    }
  }, [location.state]);

  async function loginCallback(username, password) {
    var edLogin = await login(username, password);
    console.log(edLogin);
    if (edLogin.message !== "") {
      navigate("/login", { state: { error: edLogin.message } });
    } else {
      navigate("/notes", {
        state: {
          token: edLogin.token,
          accountId: edLogin.data.accounts[0].id,
        },
      });
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
