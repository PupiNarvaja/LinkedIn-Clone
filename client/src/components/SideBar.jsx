import banner from '../assets/banner.png';
import { useSelector } from 'react-redux'

const SideBar = () => {
  const user = useSelector((state) => state.userReducer.user);

  const recentItems = (topic) => (
    <li className="duration-150 hover:bg-neutral-200">
      <a href="#" className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black">
        <span className="mr-2">#</span>
        <p>{topic}</p>
      </a>
    </li>
  );

  return (
    <aside className="min-w-[180px] h-auto flex-[0.2083] rounded-lg text-center">
      <div className="pb-[10px] flex flex-col items-center border border-b-0 border-gray-300 bg-white rounded-t-lg">
        <img
          src={banner}
          alt=""
          className="w-full h-[60px] rounded-t-lg object-cover"
        />
        <img
          src={user?.profile}
          alt=""
          className=" w-[72px] h-[72px] mt-[-38px] mb-4 object-cover rounded-full border-2 border-solid border-white"
        />
        <h2 className="text-md font-semibold">{user?.firstname} {user?.lastname}</h2>
        <h4 className="text-gray-400 text-xs">{user?.email}</h4>
      </div>

      <div className="px-[10px] py-3 border border-b-0 border-gray-300 bg-white">
        <div className="mt-[10px] flex justify-between">
          <p className="text-gray-400 text-xs font-semibold">Contacts</p>
          <p className="text-xs text-[#0a66c2] font-bold">51</p>
        </div>
        <div className="mt-[10px] flex justify-between">
          <p className="text-gray-400 text-xs font-semibold">Views on your profile</p>
          <p className="text-xs text-[#0a66c2] font-bold">63</p>
        </div>
      </div>
      <div className=" border border-gray-300 bg-white rounded-b-lg">
        <span>My items</span>
      </div>

      <div className="py-[10px] mt-[10px] sticky top-[76px] text-left linkedin-border">
        <p className="pl-3 text-xs">Recent</p>
        <ul>
          {recentItems("reactjs")}
          {recentItems("programming")}
          {recentItems("softwareengineering")}
          {recentItems("design")}
          {recentItems("developer")}
        </ul>
      </div>
    </aside>
  )
};

export default SideBar;

// Crear el skeleton hasta que carguen los datos del user.

// 1128
// 960
// 720
// 576