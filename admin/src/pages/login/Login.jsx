import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { useAsyncError, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { data, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.IsAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Доступ запрещен!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">    
      <div className="logBody">
        <div className="logTitle">
          <h1>Вход для Администратора</h1>  
        </div>        
        <div className="logBodyContainer">       
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
