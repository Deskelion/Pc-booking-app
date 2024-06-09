import express from "express";
import { isAdmin, verifyUser } from "../utils/verifyToken.js";
import { createBooking, deleteBooking, getBookings, getBookingsByUser, updateBooking } from "../controllers/booking.js";


const router = express.Router();

router.get("/userbookings/:id", getBookingsByUser);
//Create
router.post("/create", verifyUser, createBooking);
//Update
router.put("/:id", isAdmin, updateBooking);
//Delete
router.delete("/:id", verifyUser, deleteBooking);
//Get
// router.get("/:id", getBooking);
//Get all
router.get("/", getBookings);

export default router;