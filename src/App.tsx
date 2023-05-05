
import "react-toastify/dist/ReactToastify.css";
import Login from "./modules/auth/Login";
import Routess from "./Routes";
import Nav from "./modules/header/Nav";

const App = () => {
  return (
      <div className="App">
        <Nav/>
        <Routess/>
      </div>
   
  );
};

export default App;
