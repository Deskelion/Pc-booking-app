import React, { useState, useEffect } from 'react';
import BookingFrame from '../bookingFrame/BookingFrame';
import Booking from '../booking/Booking';
import "./form.css";

const Form = ({ setShowForm }) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [frameScale, setFrameScale] = useState(1);
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });

  const handlePlaceClick = (id, fill, exAtr) => {
    setSelectedPath({ id, fill, exAtr });
  };

  const changeColor = (id) => {
    console.log(`Changing color of path with ID: ${id}`);
    document.getElementById(id).style.fill = '#F6768E';
  };

  return (
    <div className='form'>
      <div className='fContainer'>
        <div className='fHeaderContainer'>
          <h1>Выберите бронируемое место</h1>
          <button className='fButton' onClick={() => setShowForm(false)}>Закрыть</button>
        </div>  
        <div className='fBodyContainer'>        
          <BookingFrame scale={frameScale} position={framePosition} onPathClick={handlePlaceClick} />
          {selectedPath && 
          <div className='bookingContainer'>
            <Booking 
              id={selectedPath.id} 
              fill={selectedPath.fill} 
              exAtr={selectedPath.exAtr} // Передача exAtr в Booking
              onClose={() => setSelectedPath(null)} 
              changeColor={changeColor} 
            />
          </div>}
        </div>
      </div>
    </div>
  );
};
export default Form;






