const express = require('express');
const router = express.Router();
const CollectionForm = require('../models/CollectionForm');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// GET route for list all donations
router.get('/', async (req, res) => {
    try {
        const collectionForms = await CollectionForm.find();
        res.json(collectionForms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST route to create a new donation form
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const {
      purpose,
      accountHolderName,
      accountNumber,
      ifscCode,
      branchDetails,
      phoneNumber,
      goal,
      remark,
    } = req.body;

    if (!req.file) {
        console.log("file upload faild");
        return res.status(400).json({ error: 'File upload failed!' });
      }

    const collectionForm = new CollectionForm({
      purpose,
      image: req.file.path, // Path to the uploaded image
      accountHolderName,
      accountNumber,
      ifscCode,
      branchDetails,
      phoneNumber,
      goal,
      remark,
    });
    // console.log(req.file);
    

    await collectionForm.save();
    res.status(201).json({ message: 'New Donation created successfully', collectionForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;