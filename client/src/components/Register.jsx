import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(null);
  const [profile, setProfile] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (email === "" || password === "") { // Agregar fields.
      return alert("Empty fields");
    }

    const userData = {
      email,
      firstname,
      lastname,
      password,
      age,
      address,
      phone,
      profile,
    };
    const config = { headers: { "content-type": "application/json" } };

    try {
      const res = await axios.post("http://localhost:8080/register", userData, config);
      console.log(res.data);      //  Debo recibir al usuario y su info. Deshabilitar botones y eso. SE REPITE EN LOGIN. REFACTORIZAR.
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
      <form onSubmit={handleRegister} className="flex flex-col">
        <input
          type="firstname"
          placeholder="firstname"
          name="firstname"
          id="firstname"
          className="px-4 py-2"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="lastname"
          placeholder="lastname"
          name="lastname"
          id="lastname"
          className="px-4 py-2"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
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
        <input
          type="age"
          placeholder="age"
          name="age"
          id="age"
          className="px-4 py-2"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="address"
          placeholder="address"
          name="address"
          id="address"
          className="px-4 py-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="phone"
          placeholder="phone"
          name="phone"
          id="phone"
          className="px-4 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="profile"
          placeholder="profile"
          name="profile"
          id="profile"
          className="px-4 py-2"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <button type="submit">
          Sign in
        </button>
      </form>
      <p>
        Not a member?
        <Link to="/login"> Login now</Link>
      </p>
    </div>
  );
};

export default Register;
