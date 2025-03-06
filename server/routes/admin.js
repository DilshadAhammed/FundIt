const express = require('express');
const auth = require('../middleware/auth');
const Donation = require('../models/Donation');
const router = express.Router();

// Get all donations
router.get('/donations', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    const donations = await Donation.find();
    res.json(donations);
});

module.exports = router;