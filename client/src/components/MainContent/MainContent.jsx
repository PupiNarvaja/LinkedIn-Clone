import Header from "../Header/Header";
import SideBar from "../SideBar";
import Feed from "../Feed/Feed";
import Widgets from "../Widgets/Widgets";

const MainContent = () => {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1128px] mt-7 mx-auto flex justify-center">
        <SideBar />
        <Feed />
        <Widgets />
      </div>
    </>
  );
};

export default MainContent;
