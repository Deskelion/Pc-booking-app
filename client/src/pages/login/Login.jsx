import { useContext, useEffect, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch({ type: "RESET_ERROR" });
  }, []);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate(redirectPath);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">    
      <div className="logBody">
        <div className="logTitle">
          <h1>Вход</h1>  
        </div>        
        <div className="logBodyContainer">
          <div className="logClose">
            <div className="lBackBuuton">
              <Link to="/">
                <p>Вернуться</p>
              </Link>
            </div>
          </div>        
          <form className="lFormContainer">
            <div className="lInputItem">
              <label>Логин</label>
              <input type="text" id="username" onChange={handleChange} required />
           </div>
            <div className="lInputItem">
              <label>Пароль</label>
              <input
                type="password"
                className="usernameinput"
                id="password"
                onChange={handleChange}
                required
              />  
            </div>
          </form>
          <div className="formActions">
            <div>
              <button 
                disabled={loading}
                onClick={handleClick}
                className="loginButton">
                Вход
              </button>
              {error && <span className="error-message">{error.message}</span>}
            </div>
            <div className="pass">
              <Link to="/forgotpassword">Забыли пароль?</Link>
            </div>
            <div className="signupLink">
              <p>Еще не зарегистрированы?</p>
              <Link to="/register">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
