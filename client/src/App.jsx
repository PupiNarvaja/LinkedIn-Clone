import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register/Register";
import MainContent from "./components/MainContent/MainContent";
import useSetUser from "./customHooks/useSetUser";

const App = () => {
  // If user refreshes the site, it's info will be requested.
  // If an error occurs, it will redirect to "/Login".
  const user = useSetUser();
  if (!user) {
    return <Navigate replace to="/login" /> // ESTA RECIBIENDO UN HTML NO SE PORQUE. VERIFICAR RUTA DE API/USERS.
  }

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
