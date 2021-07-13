import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../medium/Context";
import "../index.css";

const Author = ()=> {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="Author">
      {file && (
        <img className="wImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="wForm" onSubmit={handleSubmit}>
        <div className="wForGroup">
          <label htmlFor="fileInput">
            <i className="wIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="wInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="wForGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="wInput wText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="wSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Author