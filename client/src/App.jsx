import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";

import Login from "./components/Login";
import Register from "./components/Register";
import MainContent from "./components/MainContent/MainContent";

const App = () => {
  // const user = useSelector(selectUser);

  // useEffect(() => {

  //   return () => {
  //     second
  //   }
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <Navigate replace to="/feed" /> } />

        <Route path="/feed" exact element={ <MainContent /> } />

        <Route path="/login" exact element={ <Login /> } />

        <Route path="/register" exact element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// border border-b-0 border-gray-300 BORDER CLASSIC

// Prop drilling
