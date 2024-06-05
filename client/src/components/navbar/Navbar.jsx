import { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        </Link>
        <div className="navItems">
          {user && user !== null ? (
            <>
              <span style={{ marginRight: "10px" }}>
                Добрый день, {user.username}!  
              </span>
              <Link
                to={`/profile/${user._id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className="navButton">Профиль</button>
              </Link>
              <button className="navButton" onClick={handleLogout}>
                Выйти 
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navButton">Вход</button>
              </Link>
              <Link to="/register">
                <button className="navButton">Регистрация</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

