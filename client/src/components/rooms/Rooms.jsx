import axios from 'axios';
import './rooms.css'
import { useEffect, useState } from 'react';


const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
          try {        
            const response = await axios.get('/rooms');
            setRooms(response.data);
          } catch (error) {
            console.error("Ошибка при получении списка комнат:", error);
          }
        };
        fetchRooms();
      }, []);
    console.log(rooms);
    
    return (
        <div className='rooms'>
            <div className='rBody'>
                <div className="roomHolder">
                  {rooms && rooms.map((room) => (
                    <div className="roomContainer" key={room._id}>                      
                      <div className="roomItem"> {room.title}</div>
                      <div className="roomItem"> Количество мест {room.places.length}</div>
                      <div className="roomItem"> {room.desc}</div>
                      <div className="roomItem"> Цена за час: {room.pricePerHour} руб.</div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    );
}

export default Rooms;