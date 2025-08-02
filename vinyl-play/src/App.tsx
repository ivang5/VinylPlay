import "./App.css";
import Callback from "./pages/Callback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { tokenStorage } from "./auth/tokenStorage";
import { SpotifyPlayerProvider } from "./context/SpotifyPlayerContext";
import { redirectToSpotifyAuthorize } from "./auth/authService";

export const App = () => {
  const accessToken = tokenStorage.accessToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !accessToken ? (
              <button onClick={redirectToSpotifyAuthorize}>
                Login with Spotify
              </button>
            ) : (
              <SpotifyPlayerProvider accessToken={accessToken}>
                <Home />
              </SpotifyPlayerProvider>
            )
          }
        />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
};
