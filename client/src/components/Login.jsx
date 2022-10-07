import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  // Crear error para mostrar. Guardar el mail en un redux por si contra equivocada, poder poner el mail de vuelta.

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email === "" || password === "") {
      return alert("Empty fields");
    }

    const userData = { email, password };
    const config = { headers: { "content-type": "application/json" } };

    try {
      const res = await axios.post("http://localhost:8080/login", userData, config);
      console.log(res.data);      //  Debo recibir al usuario y su info. Deshabilitar botones y eso.
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate replace to="/feed" />;
  }

  return (
    <div className="mx-auto py-26 grid place-items-center">
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          className="px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          className="px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Sign in
        </button>
      </form>
      <p>
        Not a member?
        <Link to="/register"> Register now</Link>
      </p>
    </div>
  );
};

export default Login;

//window.location = "/feed"





//Asi es. Al ser mi lenguaje primario, estoy constantemente usandolo y conociendo más a fondo el lenguaje.

//Si. Estoy siempre al tanto de las mejores prácticas y como implementar excelente código aprovechando la naturaleza de esta librería.

//Javascript es mi herramienta de día a día, siendo mi elección para desarrollar las UIs de mis aplicaciones, como el servidor con Node.js. También actualmente estoy aprendiendo React Native, siendo otro ambito donde JavaScript sigue presente.

//Con el acompañamiento necesario, el alumno aprende bien, con ganas y motivación. Si no consigue la ayuda que debería, esto no será así, dejando una mala experiencia. Quisiera hacer la diferencia. Sé que puedo encaminar a aquellos aspirantes a aprenderlo.