import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./booking.css";
import { ReactComponent as Pc } from '../../assets/Pc.svg';
import axios from 'axios';

const Booking = ({ exAtr, id, fill, onClose, changeColor }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate()

  const { user, dispatch } = useContext(AuthContext);
  
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const handleDateChange = (e) => setDate(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleDurationChange = (e) => setDuration(Number(e.target.value));

  const getEndTime = () => {
    if (!date ||!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date(date);
    endTime.setHours(hours + duration, minutes);
    return endTime.toTimeString().slice(0, 5);
  };

  const endTimeHere = getEndTime();;


  const createBookingData = async () => {
    try {
      const username = user?._id;
      const placename = id;
      const roomTitle = exAtr;
      console.log(roomTitle); 
      
      const bookingData = {
        roomTitle: roomTitle,
        userId: username,
        placeName: placename, 
        date: date, 
        startTime: startTime,
        endTime : endTimeHere,

      };
      console.log(bookingData)


      const response = await axios.post('bookings/create', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Бронирование успешно создано');
        // Здесь можно добавить логику для перенаправления пользователя или отображения сообщения об успехе
      } else {
        console.error('Ошибка при создании бронирования');
      }
    } catch (error) {
    }
  };


  return (
    <div className='booking'>
      <div className='bContainer'>
        <div className='bHeaderContainer'>
          <h1>{id}</h1>
          <button className='closeButton' onClick={onClose}>Закрыть</button>
        </div>
        <div className='bBodyContainer'>
          <div className='computerPhoto'>
            <Pc/>
          </div>
          <div className='computerDescription'>
            <div className='bDescription'>
              <p>Процессор - AMD Ryzen 5 5600x</p>
              <p>Видеокарта - NVIDIA GeForce RTX 3060</p>
              <p>Оперативка - XPG Spectrix RGB 32Gb 3200MHz</p>
              <p>SSD - GIGABYTE SSD 512GB</p>
            </div>
          </div>
        </div>          
        <div className='bFooterContainer'>
          <div className='inputContainer'>
            <p>Дата</p>
            <input type='date' className='bInputDate' value={date} onChange={handleDateChange} />
          </div>
          <div className='timeContainer'>
            <div className='inputContainer'>
              <p>Время начала</p>
              <input type='time' className='bInputTime' value={startTime} onChange={handleStartTimeChange} />
            </div>
            <div className='inputContainer'>
              <p>Время окончания</p>
              <input type='text' className='bInputTime' value={getEndTime()} readOnly />
            </div>
          </div>          
          <div className='inputContainer'>
            <p>Выбор на сколько часов хотите забронировать</p>
            <select className='bInput' value={duration} onChange={handleDurationChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                <option key={hour} value={hour}>{hour} час{hour > 1 ? 'а' : ''}</option>
              ))}
            </select>
          </div>
          
          <button className='bButton' onClick={() => {changeColor(id); onClose(id); createBookingData();} }>Забронировать</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
