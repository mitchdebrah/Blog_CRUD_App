import axios from "axios";
import { useState } from "react";
import "../index.css";

 const Register =() =>{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const getSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="reg">
      <span className="regTitle">SIGN UP</span>
      <form className="regForm" onSubmit={getSubmit}>
        <label className="reglit">Username</label>
        <input
          type="text"
          className="regIn"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="reglit">Email</label>
        <input
          type="text"
          className="regIn"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="reglit">Password</label>
        <input
          type="password"
          className="regIn"
          placeholder="Enter password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="regButt" type="submit">
         Sign Up
        </button>
      </form>
      
      {error && <span style={{color:"red", marginTop:"10px"}}>Wrong Crendentials!</span>}
    </div>
  );
}
export default Register;