import "./Loader.css";

const Loader = () => {
  return (
    <div className={`flex justify-center`}>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader;