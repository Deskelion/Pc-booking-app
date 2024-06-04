import "./register.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Register = () => {
  const [isActive, setIsActive] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    dateOfBirth: "",
    phoneNumber: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [dateError, setDateError] = useState("");
  const [file, setFile] = useState(null); // State to manage the file upload

  useEffect(() => {
    setIsActive(true);
  }, []);

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

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <div className={`backgroundcolor ${isActive ? "active" : ""}`}>
      <div className={`centered ${isActive ? "active" : ""}`}>
        <div className="logo-container1">
          <Link to="/">
            <p>Вернуться</p>
          </Link>
        </div>
        <h1>Регистрация</h1>
        <form>
          <div className="txt_fielded">
            <input type="text" id="username" onChange={handleChange} required />
            <span></span>
            <label>Логин</label>
          </div>
          <div className="txt_fielded">
            <input type="email" id="email" onChange={handleChange} required />
            <span></span>
            <label>Почта</label>
          </div>
          <div className="txt_fielded">
            <input
              type="password"
              className="usernameinput"
              id="password"
              onChange={handleChange}
              required
            />
            <span></span>
            <label>Пароль</label>
          </div>
          <div className="txt_fielded">
            <input
              type="password"
              className="usernameinput"
              id="confirmPassword"
              onChange={handleChange}
              required
            />
            <span></span>
            <label>Подтвердите пароль</label>
          </div>
          <div className="txt_fielded">
            {dateError && <span className="error-message1">{dateError}</span>}
            <input
              type="date"
              id="dateOfBirth"
              onChange={handleChange}
              required
            />
            <span></span>
            <label>Дата рождения</label>
          </div>
          <div className="txt_fielded">
            <input
              type="text"
              id="phoneNumber"
              onChange={handleChange}
              required
            />
            <span></span>
            <label>Телефон</label>
          </div>
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput">
              <label htmlFor="file">
                Фотография: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </form>
        <div className="form-actions">
          <button
            disabled={loading}
            onClick={handleClick}
            className="registerbth"
          >
            Зарегистрироваться
          </button>
          {passwordError && (
            <span className="error-message">{passwordError}</span>
          )}
          {error && <span className="error-message">{error.message}</span>}
          <div className="signup_link">
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
