import Place from "../models/Place.js";
import Room from "../models/Room.js";

export const createPlace = async (req, res, next) => {
    const placeId = req.params.placeid; 
    const newPlaceData = {
       ...req.body,
        desc: req.body.desc || 'Default description',Ы
    };
    const newPlace = new Place(newPlaceData);

    try {
        const savedPlace = await newPlace.save();
        const room = await Room.findById(placeId); 
        if (!room) throw new Error('Room not found');
        room.places.push(savedPlace._id);
        await room.save();

        res.status(200).json(savedPlace);
    } catch (err) {
        next(err);
    }
};

export const deletePlace = async (req, res, next) => {
    const placeId = req.params.id; 
    try {
        const place = await Place.findByIdAndDelete(placeId);
        if (!place) throw new Error('Place not found');

        const rooms = await Room.find({ places: placeId });
        if (rooms.length > 0) {
            for (let room of rooms) {
                room.places.pull(placeId);
                await room.save(); 
            }
        }

        res.status(200).json("Place has been deleted.");
    } catch (err) {
        next(err);
    }
};
export const updatePlace = async (req,res,next) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPlace);          
    } catch (err) {
        next(err);      
    }
};
export const getPlace = async (req,res,next) => {
    try {
        const place = await Place.findById(
            req.params.id
        );
        res.status(200).json(place);             
    } catch (err) {
        next(err);      
    }
};

export const getPlaces = async (req,res,next) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);       
    } catch (err) {
        next(err);      
    }
};

export const getPlaceByPlacename = async (req, res, next) => {
    try {
        
        const { placename } = req.params; 
        console.log("Received placename:", placename);
        const place = await Place.findOne({ placename });
        if (!place) {
            return res.status(404).json({ message: 'Место не найдено' });
        }
        res.status(200).json(place);     
    } catch (err) {
        next(err);      
    }
};