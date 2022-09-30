import "./Loader.css";

const Loader = ({ classes }) => {
  return (
    <div className={`flex justify-center ${classes}`}>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader;