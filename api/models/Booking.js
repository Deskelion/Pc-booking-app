import mongoose from "mongoose";
import moment from "moment";

const dateValidator = [
    {
        validator: function(value) {
            return moment(value, 'DD/MM/YYYY', true).isValid();
        },
        message: props => `${props.value} is not a valid date format! Use DD/MM/YYYY.`
    }
];

const timeValidator = [
    {
        validator: function(value) {
            return moment(value, 'HH:mm', true).isValid();
        },
        message: props => `${props.value} is not a valid time format! Use HH:MM.`
    }
];

const BookingSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    placename: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
        validate: timeValidator
    },
    endTime: {
        type: String,
        required: true,
        validate: timeValidator
    },
    totalTime: {
        type: Number,
        required: true
    },    
    amount: {
        type: Number
    }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
