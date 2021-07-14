import { useEffect, useState } from "react";
import Header from "../components/TopHeader";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useLocation } from "react-router";
import "../index.css";
import Oceanvideo from "../components/video/oceanvideo.mp4"

const Homepage=()=> {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <div>
      <video autoPlay
        loop
        muted 
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "20%",
          height: "50%",
          objectFit:"cover",
          transform:"translate(-50%, -50%)",
          zIndex: "-1"
        }}
           >
        <source src={Oceanvideo} type="video/mp4"/>
      </video>
      <Header />
      <div className="homepage">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
}
export default Homepage;