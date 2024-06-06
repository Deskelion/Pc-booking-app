import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};


export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getRoomPlaces = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('places');
    res.status(200).json(room.places);
  } catch (err) {
    next(err);
  }
};
