import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";

import Header from "./components/Header/Header";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/feed"
          exact
          element={
            <>
              <Header />
              <div className="w-full max-w-[1128px] mx-auto flex justify-center">
                <SideBar />
                <Feed />
                {/* Widgets */}
              </div>
            </>
          }
        />
        <Route path="/login" exact element={ <Login /> } />
        <Route path="/register" exact element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// border border-b-0 border-gray-300 BORDER CLASSIC

// Prop drilling
