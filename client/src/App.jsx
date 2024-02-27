import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MainContent from "./components/MainContent/MainContent";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <Navigate replace to="/feed" /> } />

        <Route path="/feed" exact element={ <MainContent /> } />

        <Route path="/login" exact element={ <Login /> } />

        <Route path="/register" exact element={ <Register /> } />

        <Route path="/in/:user" exact element={ <Profile /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// border border-b-0 border-gray-300 BORDER CLASSIC
