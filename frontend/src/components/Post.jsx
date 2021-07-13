import "../index.css";
import { Link } from "react-router-dom";

const Post =({ post }) => {
  const imageURL = "http://localhost:3003/images/";
  return (
    <div className="onepst">
      {post.photo && <img className="pImg" src={imageURL + post.photo} alt="" />}
      <div className="pInfo">
        <div className="psect">
          {post.sections.map((s) => (
            <span className="psect">{s.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="push">
          <span className="ptitle">{post.title}</span>
        </Link>
        <hr />
        <span className="pdate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="pDesc">{post.desc}</p>
    </div>
  );
}
export default Post