import "./newcity.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const NewProperty = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let newProp = { ...info };

      if (path === "hotelratings" && file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dwvifh6bk/image/upload",
          data
        );

        const { url } = uploadRes.data;
        newProp = { ...info, photo: url };
      }

      await axios.post(`/${path}`, newProp);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (success) {
      let message;
      switch (path) {
        case "cities":
          message = "Город успешно добавлен!";
          break;
        case "hotelchains":
          message = "Сеть отелей успешно добавлена!";
          break;
        case "hotelratings":
          message = "Рейтинг успешно добавлен!";
          break;
        default:
          message = "Элемент успешно добавлен!";
      }
      alert(message);
      navigate(`/${path}`);
    }
  }, [success, navigate, path]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        {path === "hotelratings" && (
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
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}
        <div className="right">
          <form>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                />
              </div>
            ))}
            <button onClick={handleClick}>Принять</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProperty;
