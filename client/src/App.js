import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProfilePage from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import GameRooms from "./pages/gameRooms/GameRooms";
import News from "./pages/news/News";
import Prices from "./pages/prices/Prices";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/profile/:userid" element={<ProfilePage/>}/>
        <Route path="/rooms" element={<GameRooms/>}/>
        <Route path="/prices" element={<Prices/>}/>
        <Route path="/news" element={<News/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
