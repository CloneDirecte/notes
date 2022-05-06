import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

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
    var raw = `data={\n	\"identifiant\": \"${username}\",\n	\"motdepasse\": \"${password}\"\n}`;
    var config = {
      method: "post",
      url: "https://api.ecoledirecte.com/v3/login.awp",
      headers: {},
      data: raw,
    };

    await axios(config).then((res) => {
      console.log(res);
      if (!(res.data.message === "")) {
        navigate("/login", { state: { error: res.data.message } });
      } else {
        navigate("/notes", {
          state: {
            token: res.data.token,
            accountId: res.data.data.accounts[0].id,
          },
        });
      }
    });
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
