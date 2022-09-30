import "./Loader.css";

const Loader = ({ marginTop }) => {
  return (
    <div className={`flex justify-center mt-${marginTop}`}>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader;