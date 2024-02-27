import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Feed from "../Feed/Feed";
import Widgets from "../Widgets/Widgets";
import useSetUser from "../../customHooks/redux-hooks/useSetUser";

const MainContent = () => {

  useSetUser();
  
  return (
    <>
      <Header />
      <div className="w-full max-w-[1128px] mt-6 mx-auto flex justify-center">
        <SideBar />
        <Feed />
        <Widgets />
      </div>
    </>
  );
};

export default MainContent;
