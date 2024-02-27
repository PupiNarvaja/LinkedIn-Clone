import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import RegisterInput from "./RegisterInput";
import Logo from "../../assets/Logo-Linkedin.png";
import usePostRequest from "../../customHooks/usePostRequest";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(null);
  const [profile, setProfile] = useState("/assets/defaultProfilePic.png");

  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      firstname,
      lastname,
      password,
      description,
      age,
      address,
      phone,
      profile,
    };
    const config = { headers: { "content-type": "application/json" } };

    const { data, error, status } = await usePostRequest("http://localhost:8080/register", userData, config);

    if (error) {
      return alert(`Error: ${error}`);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate replace to="/feed" />;
  }

  return (
    <main className="w-full max-w-[1128px] mb-60 mx-auto bg-white lg:bg-transparent">
      <header className="w-full flex flex-col px-4 py-3">
        <img src={Logo} className="w-full max-w-[135px]" />
        <h1 className="px-4 py-6 text-[32px] text-center">Get the most out of your professional life</h1>
      </header>
      <div className="mx-auto py-26 grid place-items-center">
        <form onSubmit={handleRegister} className="w-full max-w-[568px] p-6 flex flex-col rounded-lg lg:bg-white lg:max-w-[400px]">
          <RegisterInput label="firstname" value={firstname} type="text" setter={setFirstname} />
          <RegisterInput label="lastname" value={lastname} type="text" setter={setLastname} />
          <RegisterInput label="email" value={email} type="email" setter={setEmail} />
          <div className="relative">
            <button
              className="min-w-[40px] h-[32px] mr-2 absolute right-0 top-[40px] text-sm text-linkedin-gray hover:underline"
              onClick={handleShowPassword}
              type="button"
            >
              {showPassword ? "Hide" : "To show"}
            </button>
          </div>
          <RegisterInput label="password" value={password} type={showPassword ? "text" : "password"} setter={setPassword} />
          <RegisterInput label="age" value={age} type="number" setter={setAge} />
          <RegisterInput label="description" value={description} type="text" setter={setDescription} />
          <RegisterInput label="address" value={address} type="text" setter={setAddress} />
          <RegisterInput label="phone" value={phone} type="tel" setter={setPhone} />
          {/* <RegisterInput label="profile" value={profile} type="text" setter={setProfile} /> */}
          <span className="my-4 text-xs text-linkedin-gray text-center">By clicking "Accept & Join", you agree to LinkedIn 's <font className="text-linkedin-blue font-semibold cursor-pointer hover:underline">Terms of Use</font> , <font className="text-linkedin-blue font-semibold cursor-pointer hover:underline">Privacy</font> Policy, and <font className="text-linkedin-blue font-semibold cursor-pointer hover:underline">Cookie Policy</font> .</span>
          <button
            className="h-12 px-4 rounded-3xl text-white bg-linkedin-blue transition-all duration-[167m] ease-out hover:bg-linkedin-darkblue"
            type="submit"
          >
            accept and join
          </button>
          <p className="p-4 text-center">
            Already a LinkedIn member?
            <Link to="/login" className="pl-1 text-linkedin-blue font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;


// Mensajes de error, borde rojo. Validacion de campos.
// Profile temporalmente desactivado. Valor por defecto -> imagen default.