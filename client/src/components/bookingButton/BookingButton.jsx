import "./bookingButton.css";

const BookingButton = ({onClick}) => {
  return (
    <div className="bookingButtonContainer">
        <button className="bookingButton" onClick={onClick}>Забронировать</button>
    </div>
  );
};

export default BookingButton;
