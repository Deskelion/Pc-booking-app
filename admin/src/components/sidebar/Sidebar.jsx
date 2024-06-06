import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const  Sidebar= () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">АдминПанель</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Списки</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Пользователи</span>
            </li>
          </Link>
          <Link to="/bookings" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Список бронирований</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Выход</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
