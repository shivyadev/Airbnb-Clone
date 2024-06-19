const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PlaceSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  addedPhotos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuest: Number,
  price: Number,
});

const PlaceModel = model('Place', PlaceSchema);

module.exports = PlaceModel;