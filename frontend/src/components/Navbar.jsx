import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../medium/Context";

import "../index.css";

const Navbar =() => {
  const { user, dispatch } = useContext(Context);
  const imageURL = "http://localhost:3003/images/"

  const getLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  // fontawsome
  return (
    <div className="topper">
      <div className="topperLef">
        <i className="topIcon1 fab fa-facebook-square"></i>
        <i className="topIcon2 fab fa-linkedin"></i>
        <i className="topIcon3 fab fa-tiktok"></i>
        <i className="topIcon4 fab fa-twitter-square"></i>
        <i className="topIcon5 fab fa-instagram-square"></i>
      </div>
      <div className="tocent">
        <ul className="tolit">
          <li className="tolitit">
            <Link className="plus" to="/">
              Home
            </Link>
          </li>
          <li className="tolitit">
            <Link className="plus" to="/">
              About
            </Link>
          </li>
          <li className="tolitit">
            <Link className="plus" to="/">
              Contact
            </Link>
          </li>
          <li className="tolitit">
            <Link className="plus" to="/write">
              Post
            </Link>
          </li>
          <li className="tologout" onClick={getLogout}>
            {user && "Logout"}
          </li>
          <li className="tolitito" >
            {/* Acct/Sets */}
          </li>
        </ul>
      </div>
      <div className="torit">
        {user ? (
          <Link to="/settings">
            <img className="toImg" src={imageURL+user.profilePicture} alt="" />
          </Link>
        ) : (
          <ul className="tolit">
            <li className="tolitit">
              <Link className="plus" to="/login">
                Login
              </Link>
            </li>
            <li className="tolitit">
              <Link className="plus" to="/register">
                SignUp
              </Link>
            </li>
          </ul>
        )}
        
      </div>
    </div>
  );
}
export default Navbar