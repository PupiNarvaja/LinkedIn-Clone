import HeaderOption from "./HeaderOption";
import { useSelector } from "react-redux";
import HeaderAvatar from "./HeaderAvatar";

const Header = () => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <header className="w-full h-[53px] sticky top-0 border-b-[0.1px] bg-white border-gray-200 z-9">
      <div className="h-full max-w-[1128px] mx-auto flex justify-between">
        <div className="flex items-center">
          <img
            src="https://img.icons8.com/fluency/48/000000/linkedin.png"
            title="Home" alt="Linkedin icon"
            className="object-cover mr-2"
          />
          <div className="w-full max-w-[280px] shrink h-[34px] px-[10px] flex items-center rounded-md bg-[#eef3f8]">
            <img
              src="https://img.icons8.com/material-outlined/18/737373/search--v1.png"
              alt="search icon"
              className="p-2"
            />
            <input
            name="search"
            id="search"
            type="text"
            placeholder="Search"
            className="w-full text-sm outline-none border-none bg-none bg-[#eef3f8]" />
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <HeaderOption icon="https://img.icons8.com/material/24/737373/home-page.png" title="Home" />
          <HeaderOption icon="https://img.icons8.com/fluency-systems-filled/24/737373/user-group-man-man.png" title="My Network" />
          <HeaderOption icon="https://img.icons8.com/material/24/737373/briefcase--v1.png" title="Jobs" />
          <HeaderOption icon="https://img.icons8.com/fluency-systems-filled/24/737373/filled-speech-bubble-with-dots.png" title="Messaging" />
          <HeaderOption icon="https://img.icons8.com/glyph-neue/24/737373/appointment-reminders.png" title="Notifications" />
          <HeaderAvatar avatar={user?.profile} url={user?.url} />
        </div>
      </div>
    </header>
  );
};

export default Header;

{
  /* <a target="_blank" href="https://icons8.com/icon/xuvGCOXi8Wyg/linkedin">LinkedIn icon by Icons8</a> */
}
{
  /* <a target="_blank" href="https://icons8.com/icon/82712/search">Search icon by Icons8</a> */
}
