import mongoose from 'mongoose';
import moment from 'moment';
import { createError } from '../utils/error.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Room from '../models/Room.js';
import Place from '../models/Place.js';

export const createBooking = async (req, res, next) => {
  try {
    const { roomTitle, userId, placeName, date, startTime, endTime } = req.body;

    const [roomObj, userObj, placeObj] = await Promise.all([
      Room.findByName(roomTitle),
      User.findById(userId),
      Place.findByName(placeName)
    ]);

    if (!roomObj) return next(createError(404, "Room not found!"));
    if (!userObj) return next(createError(404, "User not found!"));
    if (!placeObj) return next(createError(404, "Place not found!"));

    // Calculate amount
    const totalTime = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'hours');
    const amount = roomObj.pricePerHour * totalTime;

    const newBooking = new Booking({
      username: userObj._id,
      placename: placeObj._id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      totalTime: totalTime,
      amount: amount
    });

    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedBooking) {
      return next(createError(404, "Booking not found"));
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};


export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).send("Booking has been deleted.");
  } catch (err) {
    next(err);
  }
};

// export const deleteBookingByUser = async (req, res, next) => {
//   const userId = req.params.userId;
//   try { 
//     const deletedBookings = await Booking.deleteMany({ username: userId });

//     if (deletedBookings.deletedCount === 0) {
//       return res.status(404).json({ message: 'Бронирования для данного пользователя не найдены.' });
//     }

//     res.status(200).json({ message: 'Бронирования пользователя успешно удалены.'});
//   } catch (err) {
//     next(err);
//   }
// };

// export const getBooking = async (req, res, next) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     res.status(200).json(booking);             
//   } catch (err) {
//     next(err);      
//   }
// };

export const getBookingsByUser = async (req, res, next) => {
  try {
      console.log("выводим брони пользователя");
      const { id } = req.params;
      const bookings = await Booking.find({ username: id }).populate('placename', 'placename');
      res.status(200).json(bookings);
  } catch (err) {
      next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);       
  } catch (err) {
    next(err);      
  }
};
