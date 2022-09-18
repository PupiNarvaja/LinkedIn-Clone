import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";

const App = () => {  
  return (
    <>
      <Header />

      <div className="w-full max-w-[1128px] mx-auto flex justify-center"> 
        <SideBar />
        <Feed />
        {/* Widgets */}
      </div>
    </>
  )
};

export default App;

// border border-b-0 border-gray-300 BORDER CLASSIC

// Prop drilling