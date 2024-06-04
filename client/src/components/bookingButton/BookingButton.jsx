import "./bookingButton.css";

const BookingButton = ({onClick}) => {
  return (
    <div className="booking-button-container">
        <button className="booking-button" onClick={onClick}>Забронировать</button>
    </div>
  );
};

export default BookingButton;
