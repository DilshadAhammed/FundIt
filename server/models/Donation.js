const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  purpose: {
    type: String,
    required: true,
  },
  image: {
    type: String, // This will store the file path or URL of the uploaded image
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  branchDetails: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: false,
  },
  approved: { type: Boolean, default: false },
  donors: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);
