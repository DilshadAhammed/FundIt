const mongoose = require('mongoose');

const collectionFormSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CollectionForm', collectionFormSchema);
