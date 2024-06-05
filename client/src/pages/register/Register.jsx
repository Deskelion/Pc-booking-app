import "./register.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Register = () => {
  const [passwordError, setPasswordError] = useState("");
  const [dateError, setDateError] = useState("");
  const [file, setFile] = useState(null); 
  const { loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    dateOfBirth: "",
    phoneNumber: "",
  }); 
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "RESET_ERROR" });
  }, []);

  useEffect(() => {
    if (credentials.password && credentials.confirmPassword) {
      if (credentials.password !== credentials.confirmPassword) {
        setPasswordError("Пароли не совпадают");
      } else {
        setPasswordError("");
      }
    }
  }, [credentials.password, credentials.confirmPassword]);  

  const handleChange = (e) => {
    const { id, value } = e.target;

      if (id === "dateOfBirth") {
      setCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        setDateError(age - 1 < 18 ? "Вы должны быть старше 18 лет" : "");
      } else {
        setDateError(age < 18 ? "Вы должны быть старше 18 лет" : "");
      }
    } else {
      setCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    if (passwordError) return;
    setPasswordError("");
    dispatch({ type: "REGISTER_START" });

    try {
      let userPayload = { ...credentials, isAdmin: false };

      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dwvifh6bk/image/upload",
          data
        );

        const { url } = uploadRes.data;
        userPayload = { ...credentials, IsAdmin: false, img: url };
      }

      console.log(userPayload);
      await axios.post("/auth/register", userPayload);
      dispatch({ type: "REGISTER_SUCCESS" });
      alert("Регистрация прошла успешно!");
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <div className="regHeader">
        <h1>Регистрация</h1>       
      </div> 
      <div className="regBody">
        <div className="regBodyContainer"> 
          <div className="regClose">
            <div className="rbackButton">
              <Link to="/">
                <p>Вернуться</p>
              </Link>
            </div> 
          </div>      
          <form className="rFormContainer">
            <div className="rInputItem">
              <label>Логин</label>
              <input type="text" id="username" onChange={handleChange} required />
            </div>
            <div className="rInputItem">
              <label>Почта</label>
              <input type="email" id="email" onChange={handleChange} required />
            </div>            
            <div className="rInputItem">
              <label>Пароль</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="rInputItem">
              <label>Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={handleChange}
                required
              />
            </div>
            <div className="rInputItem">
              <label>Дата рождения</label>
              <input
                type="date"
                id="dateOfBirth"
                onChange={handleChange}
                required
              />
              {dateError && <span className="errMessage1">{dateError}</span>}
            </div>
            <div className="rInputItem">
              <label>Телефон</label>
              <input
                type="text"
                id="phoneNumber"
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <div className="formActions">
            <button 
              disabled={loading}
              onClick={handleClick}
              className="regButton">
              Зарегистрироваться
            </button>
            {passwordError && (
              <span className="errMessage">{passwordError}</span>
            )}
            {error && <span className="errMessage">{error.message}</span>}
            <div className="loginLink">
              <p>Уже зарегистрированы?</p>
              <Link to="/login">Войти</Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
