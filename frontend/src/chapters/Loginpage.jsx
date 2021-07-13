import axios from "axios";
import { useContext, useRef } from "react";

import { Context } from "../medium/Context";
import "../index.css";

const Login = ()=> {
  const refUser = useRef();
  const refPasswrd = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const getSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: refUser.current.value,
        password: refPasswrd.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="log">
      <span className="logTitle">Login</span>
      <form className="logForm" onSubmit={getSubmit}>
        <label className="logsbT">Username</label>
        <input
          type="text"
          className="logput"
          placeholder="Enter  username..."
          ref={refUser}
        />
        <label className="logsbT">Password</label>
        <input
          type="password"
          className="logput"
          placeholder="Enter password..."
          ref={refPasswrd}
        />
        <button className="logButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
     
    </div>
  );
}
export default Login;