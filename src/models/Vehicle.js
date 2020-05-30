const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({
  hidden: { _id: true, __v: true },
});
const { VehicleStatuses } = require('../enums/vehicle-statuses');

const VehicleSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  modelYear: {
    type: String,
    required: true,
  },
  manufactureYear: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    require: true,
  },
  mileage: {
    type: String,
  },
  onlyOwner: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(VehicleStatuses),
    trim: true,
    default: VehicleStatuses.AVAILABLE,
  },
  price: {
    type: Number,
    required: true,
  },
  pictures: [{ base64: { type: String } }],
});

// Duplicate the ID field.
VehicleSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
VehicleSchema.set('toJSON', {
  virtuals: true,
});

VehicleSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Vehicle', VehicleSchema);
