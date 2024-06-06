import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";

const SingleBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/${path}/${id}`);
      alert("Успешно удалено");
      navigate(`/${path}`);
    } catch (err) {
      console.error("Error deleting the item", err);
      alert("Ошибка при удалении");
    } finally {
      setDeleting(false);
    }
  };

  const { data, loading, error } = useFetch(`/${path}/${id}`);

  const {
    username,
    placename,
    date,
    startTime,
    endTime,
    titalTime,
    amount
  } = data;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // добавляем 1, так как месяцы начинаются с 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // const formattedDateOfStart = formatDate();
  // const formattedDateOfEnd = formatDate();

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="header">
              <h1 className="title">Информация</h1>
              <Link to="/bookings" className="backButton">
                Назад к списку бронирований
              </Link>
            </div>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Пользователь: {}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Username {username}
                  </span>
                  <span className="itemKey">
                    Дата окончания: {}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Количество взрослых: {}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Количество детей: {}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Цена: {} .</span>
                </div>
                <div className="detailItem">
                </div>
                <div className="detailItem">
                  <span className="itemKey">Отель: {}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Тип комнаты: {}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">
                    Номера комнат: {}
                  </span>
                </div>
                <div className="buttons">
                  <div className="buttonWrapper">
                    <button
                      className="deleteButton"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? "Удаление..." : "Удалить"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBooking;
