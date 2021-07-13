import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../medium/Context";
import axios from "axios";
import "../index.css";

const Settings = () => {     // got this from stack overflow
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const imageURL = "http://localhost:3003/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const name_file = Date.now() + file.name;
      data.append("name", name_file);
      data.append("file", file);
      updatedUser.profilePicture = name_file;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="sets">
      <div className="setsWrap">
        <div className="setTitle">
          <span className="seUpTi"> Update Your Account</span>
          <span className="setDeTitle">Delete Your Account</span>
        </div>
        <form className="setForm" onSubmit={handleSubmit}>
          <label>Profile Photo</label>
          <div className="setPP">
            <img
              src={file ? URL.createObjectURL(file) : imageURL+user.profilePicture}
              alt=""
            />
            <label htmlFor="fileInput">
             <i className=" setPPIcon  fal fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="setSubmit" type="submit">
            Update Account
          </button>
          {success && (
            <span
              style={{ color: "blue", textAlign: "center", marginTop: "20px" }}
            >
              Success!!! Profile  Updated.......
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
export default  Settings;