import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../medium/Context";
import "../index.css";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const imageURL = "http://localhost:3003/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="sinost">
      <div className="singWrapper">
        {post.photo && (
          <img src={imageURL + post.photo} alt="" className="singmg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singtitle">
            {title}
            {post.username === user?.username && (
              <div className="singdit">
                <i
                  className="singcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
                <i className="singcon fas fa-thumbs-up"></i>
                <i className="singcon fas fa-thumbs-down"></i>
              </div>
            )}
          </h1>
        )}
        <div className="singInfo">
          <span className="singthor">
            Writer:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singleput"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singDesc">{description}</p>
        )}
        {updateMode && (
          <button className="singButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};
export default SinglePost;