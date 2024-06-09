import "./profile.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import UserInfo from "./UserInfo/UserInfo";
import moment from "moment"; // Импортируем moment


function ProfilePage() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const id = user._id; // Получаем идентификатор пользователя из контекста
  const [bookings, setBookings] = useState([]);
  const id2 = location.pathname.split("/")[2];
  console.log("ProfilePage rendered");

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

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Вы уверены, что хотите отменить это бронирование?")) {
      try {
        await axios.delete(`/bookings/${bookingId}`);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
        alert("Бронирование успешно отменено");
      } catch (error) {
        console.error("Ошибка при отмене бронирования:", error);
      }
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {        
        const response = await axios.get(`/bookings/userbookings/${id}`);
        setBookings(response.data);
        
      } catch (error) {
        console.error("Ошибка при получении бронирований:", error);
      }
    };
    fetchBookings();
  }, [id]);
  
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
        <span className="hline"/>
        <UserInfo />
        <div className="userButtun">
          <button
            className="deleteButton"
            onClick={handleDeleteAccount}>
              Удалить аккаунт
          </button>
        </div>
        <h2>Мои бронирования</h2>
        <span className="hline"/>
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
                  <div className="pBookingItem"> 
                    <button onClick={() => handleCancelBooking(booking._id)}>Отменить</button>
                  </div>
                </div>
              ))}
            </div>          
          ) : (
            <div className="pBookingHolder">
              <div className="">
                <p>У вас нет бронирований.</p>\
              </div>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;