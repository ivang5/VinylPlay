import "./App.css";
import Callback from "./pages/Callback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { tokenStorage } from "./auth/tokenStorage";
import { SpotifyPlayerProvider } from "./context/SpotifyPlayerContext";
import { Login } from "./pages/Login";

export const App = () => {
  const token = tokenStorage.accessToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <SpotifyPlayerProvider token={token}>
                <Home />
              </SpotifyPlayerProvider>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
};
