import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import AdminPage from "./scenes/adminPage";
import ChatroomPage from "./scenes/chatroomPage";
import SearchPage from "./scenes/searchPage";
import GuestPage from "./scenes/guestPage";
import ForgotPage from "./scenes/forgotPage";
import ResetPage from "./scenes/resetPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.token));
  const isAdmin = useSelector(state => state.isAdmin);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route 
              path="/" 
              element={isAuth ? <Navigate to="/home"/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={<LoginPage />} 
            />
            <Route path="/guest" element={<GuestPage />} />
            <Route
              path="/admin"
              element={isAdmin ? <AdminPage /> : <Navigate to="/" />}
            />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/chatroom"
              element={isAuth ? <ChatroomPage /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={isAuth ? <SearchPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
