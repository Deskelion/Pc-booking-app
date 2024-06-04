import mongoose from 'mongoose';
import Booking from './Booking.js';
import PasswordCodes from './PasswordCodes.js';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Введите никнейм'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Введите пароль'],
    },
    email:{
        type: String,
        required: [true, 'Введите почту'],
        unique:true
    },
    dateOfBirth:{
        type: Date,
        required: [true, 'Выберите дату рождения'],
    },
    phoneNumber:{
        type: String,
        required: [true, 'Введите номер телефона'],
        unique: true,
    },
    IsAdmin:{
        type: Boolean,
        required: true,
        default:false
    }
});

UserSchema.pre('remove', async function(next) {
    try {
        await PasswordCodes.deleteMany({ UserId: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.pre('remove', async function(next) {
    try {
        await Booking.deleteMany({ username: this._id });
        next();
    } catch (error) {
        next(error);
    }
});


export default mongoose.model("User", UserSchema);