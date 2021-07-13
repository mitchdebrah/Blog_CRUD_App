import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Sidebar() {
  const [sects, setCats] = useState([]);

  useEffect(() => {
    const getSects = async () => {
      const res = await axios.get("/sections");
      setCats(res.data);
    };
    getSects();
  }, []);
  return (
    <div className="sidb">
      <div className="sidItem">
        <span className="sidTitle">BIOGRAPHY</span>
        <img className="imgphoto"
          src="https://grist.org/wp-content/uploads/2015/08/kramer.jpg?w=330"
          alt=""
        />
        <p>
        Premium Oceanic Life Blog Blog Theme Try out the newest personal blog templates based on brand new themes to meet up your designing need. Be it a chef’s or a traveller’s blog, this personal theme would be the ideal one for anyone as it features author bio section to give bloggers detailed information. Thirty feet under, facedown against the white sand, he makes a stark black cutout in the shadow of the boat tethered above. The rest of the divers — a group of teenagers and adults participating in a volunteer scuba program in the Florida Keys — are already drifting toward the surface, attention fixed on the dive computers strapped to their wrists
        </p>
      </div>
      <div className="sidItem">
        <span className="sidTitle">FAVORITE CONTENT</span> 
        <ul className="sidList">
          {sects.map((s) => (
            <Link to={`/?cat=${s.name}`} className="push">
            <li className="sidebarList">{s.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      {/* fontawsome */}
      <div className="sidItem">
        <span className="sidTitle">FOLLOW ME</span> 
        <div className="sidSocial">
        <i className="topIcon1 fab fa-facebook-square"></i>  
        <i className="topIcon2 fab fa-linkedin"></i>
        <i className="topIcon3 fab fa-tiktok"></i>
        <i className="topIcon4 fab fa-twitter-square"></i>
        <i className="topIcon5 fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}