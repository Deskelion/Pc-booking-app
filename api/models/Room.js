import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  pricePerHour: {
    type: Number,
    required: true,
  }
});

RoomSchema.pre('remove', async function(next) {
  try {
      await Place.deleteMany({ places: this._id });
      next();
  } catch (error) {
      next(error);
  }
});

RoomSchema.statics.findByName = function (title) {
  return this.findOne({ title: title });
};

const Room = mongoose.model('Room', RoomSchema);
export default Room;
