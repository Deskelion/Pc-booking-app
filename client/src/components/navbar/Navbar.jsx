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
                Добрый день, {user.name}!
              </span>
              <Link
                to={`/profile/${user._id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className="navButton">Ваш профиль</button>
              </Link>
              <button className="navButton" onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <>
              <span style={{ marginRight: "10px" }}>
                Зарегистрируйтесь прямо сейчас! - {">"}
              </span>
              <Link to="/register">
                <button className="navButton">Регистрация</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Авторизация</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

