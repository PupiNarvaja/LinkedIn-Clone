import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../assets/Logo-Linkedin.png";
import image from "../../assets/linkedin-login.svg";
import LoginInput from "./LoginInput";
import usePostRequest from "../../customHooks/usePostRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocus, setIsEmailFocused] = useState(false);
  const [isPasswordFocus, setIsPasswordFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email === "" || password === "") { // Refactor.
      return alert("Empty fields");
    }

    const userData = { email, password };
    const config = { headers: { "content-type": "application/json" } };

    const { data, error: errorMsg } = await usePostRequest("http://localhost:8080/login", userData, config);
    
    if (errorMsg) {
      return setError(errorMsg);
    }

    setRedirect(true);
  };

  const handleEmailFocus = () => {
    if (email === "") {
      setIsEmailFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    if (password === "") {
      setIsPasswordFocused(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (redirect) {
    return <Navigate replace to="/feed" />;
  }

  return (
    <main className="overflow-hidden flex flex-col items-center bg-white">
      <nav className="w-full max-w-[1128px] flex flex-wrap justify-between px-4 py-3">
        <img src={Logo} className="min-h-[52.5px] max-w-[84px] w-full h-fit" />
        <div className="flex flex-nowrap gap-2">
          <Link to="/register" className="h-12 px-6 py-3 rounded-3xl font-semibold text-center hover:bg-[#0000000a]">Join now</Link>
          <Link to="/login" className="h-12 px-6 py-3 rounded-3xl font-semibold text-center text-linkedin-blue border border-linkedin-blue hover:bg-[#70b5f91a]">Log in</Link>
        </div>
      </nav>
      <section className="mx-auto px-4 py-6 max-w-[1128px] flex flex-wrap justify-center md:pr-0 md:justify-start md:flex-nowrap">
        <div className="w-full flex flex-col md:w-[38%] md:flex-shrink-0 lg:w-[55%]">
          <h1 className="mb-6 text-[32px] font-light text-[#8f5849] leading-tight md:text-[56px] md:pr-[42px]">
            We welcome you to your professional community!
          </h1>
          <form onSubmit={handleLogin} className="w-full mb-[100px] flex flex-col md:w-[408px]">
            <div className="mt-3 relative">
              <LoginInput 
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={handleEmailFocus}
              />
              <label className={`${isEmailFocus && "pt-[6px] text-xs"} p-3 absolute top-0 left-0 text-linkedin-gray transition-all duration-200 ease-in-out pointer-events-none`}>Email</label>
            </div>
            <div className="mt-3 relative">
              <LoginInput 
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={handlePasswordFocus}
              />
              <label className={`${isPasswordFocus && "pt-[6px] text-xs"} p-3 absolute top-0 left-0 text-linkedin-gray transition-all duration-200 ease-in-out pointer-events-none`}>Password</label>
              <button
                className="h-[32px] px-2 mr-2 absolute right-0 top-[10px] text-linkedin-gray font-semibold transition-all duration-[167m] ease-out hover:bg-[#cfcfcf40] hover:text-[#000000bf]"
                onClick={handleShowPassword}
                type="button"
              >
                {showPassword ? "Hide" : "To show"}
              </button>
            </div>

            {error && (
              <div className="flex justify-center">
                <span className="text-red-600">{error}</span>
              </div>
            )}

            <button
              className="w-fit mt-4 mb-6"
              onClick={() => alert("FEATURE MISSING: Create new password.")}
              type="button"
            >
              <font className="cursor-pointer hover:text-linkedin-blue hover:underline">have you forgotten your password?</font>
            </button>
            <button
              className="h-14 px-8 text-xl rounded-[28px] text-white bg-[#2977c9] transition-all duration-[167m] ease-out hover:bg-[#006097]"
              type="submit"
            >
              Log in
            </button>
          </form>
          <Link to="/register" className="w-full min-h-14 px-6 py-3 mb-6 rounded-[28px] font-semibold text-xl text-[#000000bf] text-center border border-[#000000bf] hover:bg-[#0000000a]  md:w-[408px]">
            Are you just starting to use LinkedIn? join now
          </Link>
        </div>
        <div className="flex">
          <img src={image} className="w-full max-w-[374px] md:max-w-none md:w-[700px]"/>
        </div>
      </section>    
    </main>
  );
};

export default Login;

//window.location = "/feed"

//DEBO RECIBIR LA INFO DEL USER EN TODA LA APP CADA VEZ QUE RECARGA. SI NO LO HACE, RECIBIR ERROR Y REDIRECT TO LOGIN.

// Error debe resaltar el borde en rojo y mostrar error arriba del input.



//Asi es. Al ser mi lenguaje primario, estoy constantemente usandolo y conociendo más a fondo el lenguaje.

//Si. Estoy siempre al tanto de las mejores prácticas y como implementar excelente código aprovechando la naturaleza de esta librería.

//Javascript es mi herramienta de día a día, siendo mi elección para desarrollar las UIs de mis aplicaciones, como el servidor con Node.js. También actualmente estoy aprendiendo React Native, siendo otro ambito donde JavaScript sigue presente.

//Con el acompañamiento necesario, el alumno aprende bien, con ganas y motivación. Si no consigue la ayuda que debería, esto no será así, dejando una mala experiencia. Quisiera hacer la diferencia. Sé que puedo encaminar a aquellos aspirantes a aprenderlo.