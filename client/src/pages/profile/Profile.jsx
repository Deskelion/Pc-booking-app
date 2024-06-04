import "./profile.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import EditProfileForm from "./EditForm/EditProfileForm";
import UserInfo from "./UserInfo/UserInfo";
import moment from "moment"; // Импортируем moment

function ProfilePage() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const location = useLocation();
  const id = user._id; // Получаем идентификатор пользователя из контекста
  const [bookings, setBookings] = useState([]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Вы уверены, что хотите удалить свой аккаунт?")) {
      try {
        await axios.delete(`/users/${id}`);
        alert("Аккаунт успешно удален");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      } catch (error) {
        console.error("Ошибка при удалении аккаунта:", error);
      }
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log(id, 'трай блок сработал')
        const response = await axios.get(`/bookings/${id}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Ошибка при получении бронирований:", error);
      }
    };

    fetchBookings();
  }, [id]);

  return (
    <div className="container">
      <Navbar />
      <div className="profile-header">
        <h1>Профиль</h1>
      </div>
      <div className="button-div">
        <button className="button back-button" onClick={handleGoBack}>
          Назад
        </button>
      </div>
      <div className="profile-content">
        {activeTab === "info" ? (
          <>
            {editMode ? (
              <EditProfileForm setEditMode={setEditMode} />
            ) : (
              <>
                <UserInfo />
                <br />
                <button className="button" onClick={() => setEditMode(true)}>
                  Редактировать профиль
                </button>
                <button
                  className="button delete-button"
                  onClick={handleDeleteAccount}
                >
                  Удалить аккаунт
                </button>
              </>
            )}
          </>
        ) : (
          <div>
            <h2>Мои бронирования</h2>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking) => (
                  <li key={booking._id}>
                    <div><strong>Место:</strong> {booking.placename.name}</div>
                    <div><strong>Дата:</strong> {moment(booking.date).format('DD/MM/YYYY')}</div>
                    <div><strong>Время:</strong> {booking.startTime} - {booking.endTime}</div>
                    <div><strong>Общее время:</strong> {booking.totalTime} часов</div>
                    <div><strong>Сумма:</strong> {booking.amount} руб.</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>У вас нет бронирований.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;