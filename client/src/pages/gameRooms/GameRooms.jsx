import BookingButton from "../../components/bookingButton/BookingButton";
import Footer from "../../components/footer/Footer";
import Form from "../../components/form/Form";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Rooms from "../../components/rooms/Rooms";
import './gameRooms.css'
import { useState } from "react";

const GameRooms = () => {
  const [showForm, setShowForm] = useState(false); // Добавлено состояние для управления видимостью формы

  const bookingHandler = () => {
    setShowForm(true); // Показываем форму при нажатии на кнопку
  };
 
  return (
    <div className="gameRooms">
      <Navbar />
      <Header/>
      <div className="grContainer">
        <div className="grHolder">
          <div className="roomsContainer">
            <Rooms/>
          </div>          
        </div>
        {!showForm && <BookingButton onClick={bookingHandler}/>}
        {showForm && 
        <div className="formContainer">
          <Form setShowForm={setShowForm}/>
        </div>}
        <Footer/>
      </div>
    </div>
  );
};

export default GameRooms;
