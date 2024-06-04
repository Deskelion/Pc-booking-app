import express from "express";
import { isAdmin } from "../utils/verifyToken.js";
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace } from "../controllers/place.js";


const router = express.Router();

//Create
router.post("/:placeid", isAdmin, createPlace);
//Update
router.put("/:id", isAdmin, updatePlace);
//Delete
router.delete("/:id/:placeid", isAdmin, deletePlace);
//Get
router.get("/:id", getPlace);
//Get all
router.get("/", getPlaces);

export default router;