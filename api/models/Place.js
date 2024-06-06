import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  placename: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  occupied: {
    type: Boolean,
    default: false,
  },
},);

PlaceSchema.statics.findByName = function (name) {
  console.log("Searching for place with name:", name); 
  return this.findOne({ placename: name });
};

const Place = mongoose.model('Place', PlaceSchema);

export default Place;
