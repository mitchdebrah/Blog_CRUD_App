
import "../index.css";

const Header =() => {
  return (
    <div className="headbd">
      <div className="headerTitles">
        {/* <span className="headerTitleSm">React & Node</span> */}
        <span className="blogtitle">Oceanic Life Blog</span>
      </div>
      <img
        className="Imghead"
        src="https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_1219_16188294042402066.jpg"
        alt=""
      />
    </div>
  );
}
export default Header;