import express from "express";
import { isAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRoomPlaces, getRooms, updateRoom } from "../controllers/room.js";

const router = express.Router();

//Create
router.post("/", isAdmin, createRoom);
//Update
router.put("/:id", isAdmin, updateRoom);
//Delete
router.delete("/:id", isAdmin, deleteRoom);
//Get
router.get("/:id", getRoom);
//Get all
router.get("/", getRooms);


router.get("/place/:id", getRoomPlaces);


export default router;