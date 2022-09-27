// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";

import Header from "./components/Header/Header";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import Login from "./components/Login";

const App = () => {
  //const user = useSelector(selectUser);
  const user = true;

  return (
    <>
      <Header />

      {!user ? (
        <Login />
        ) : (
          <div className="w-full max-w-[1128px] mx-auto flex justify-center">
          <SideBar />
          <Feed />
          {/* Widgets */}
        </div>
      )}
    </>
  );
};

export default App;

// border border-b-0 border-gray-300 BORDER CLASSIC

// Prop drilling
