const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const multer = require('multer');
const auth = require('../middleware/auth');

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

// Get approved donations (for Donate page)
router.get('/approved', async (req, res) => {
  try {
    const donations = await Donation.find({ approved: true });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    const collectionForm = new Donation({
      purpose,
      image: req.file.path, // Path to the uploaded image
      accountHolderName,
      accountNumber,
      ifscCode,
      branchDetails,
      phoneNumber,
      goal,
      remark,
      approved: false,
    });
    // console.log(req.file);
    

    await collectionForm.save();
    res.status(201).json({ message: 'New Donation created successfully', collectionForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all donations (for admin)
router.get('/admin', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Approve a donation (admin only)
router.put('/approve/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json({ message: 'Donation approved successfully', donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;