import "./profile.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const id = user._id; // Получаем идентификатор пользователя из контекста
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);

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
        const response = await axios.get(`/bookings/userbookings/${id}`);
        setBookings(response.data);
        console.log(response, 'трай блок сработал')
        
      } catch (error) {
        console.error("Ошибка при получении бронирований:", error);
      }
    };
    fetchBookings();
  }, [id]);
  console.log(bookings, 'мы получили данные о бронировании с БД')

  return (
    <div className="profile">
      <Navbar />
      <div className="UserInfo">
        <div className="profileClose">
          <div className="pBackButton">
            <Link to="/">
              <p>Вернуться</p>
            </Link>
          </div>
        </div>
        <h2>Профиль</h2>
        <UserInfo />
        <div className="userButtun">
          <button
            className="deleteButton"
            onClick={handleDeleteAccount}>
              Удалить аккаунт
          </button>
        </div>
        <h2>Мои бронирования</h2>
        <div className="BookingInfo">
        <p>Место:</p>
        <p>Дата:</p>
        <p>Время:</p> 
        <p>Общее время:</p>
        <p>Сумма:</p>
        </div>         
          
          {bookings.length > 0 ? (
            <div className="pBookingHolder">
              {bookings.map((booking) => (
                <div className="pBookingContainer" key={booking._id}>
                  <div className="pBookingItem"> {booking.placename.placename}</div>
                  <div className="pBookingItem">{moment(booking.date).format('DD/MM/YYYY')}</div>
                  <div className="pBookingItem"> {booking.startTime} - {booking.endTime}</div>
                  <div className="pBookingItem"> {booking.totalTime} ч.</div>
                  <div className="pBookingItem"> {booking.amount} руб.</div>
                  <div className="pBookingItem"> Отменить </div>
                </div>
              ))}
            </div>          
          ) : (
            <div className="pBookingHolder">
               <p>У вас нет бронирований.</p>
            </div>

          )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;