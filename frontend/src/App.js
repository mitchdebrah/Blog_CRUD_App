
import React from "react"
import Homepage from "./chapters/Homepage";
import Navbar from "./components/Navbar";
import Singlepage from "./chapters/Singlepage";
import Author from "./chapters/Author.jsx";
import SettingsAcct from "./chapters/SettingsAcct";
import Loginpage from "./chapters/Loginpage"
import Registerpage from "./chapters/Registerpage";





const  App = ()=> {
  const { user } = useContext(Context);
  return (
    <div>
      <p>Hello World</p>
    </div>
   
  );
}

export default App;