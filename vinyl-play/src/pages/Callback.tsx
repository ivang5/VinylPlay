import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { exchangeToken } from "../auth/authService";
import { tokenStorage } from "../auth/tokenStorage";

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      exchangeToken(code).then((token) => {
        tokenStorage.save(token);
        navigate("/");
      });
    }
  }, []);

  return <div>Logging in...</div>;
}
