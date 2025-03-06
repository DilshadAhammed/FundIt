const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Donation = require('./models/Donation');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB:", error));


app.use('/api/donations', require('./routes/donation'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

app.post("/webhook", async (req, res) => {
  const secret = "YOUR_WEBHOOK_SECRET"; // Set in Razorpay dashboard
  const receivedSignature = req.headers["x-razorpay-signature"];

  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (receivedSignature === expectedSignature) {
    const { donationId, donorName, amount } = payload.payment.entity.notes;

    try {
      const donation = await Donation.findById(donationId);
      if (!donation) {
        return res.status(404).json({ error: 'Donation not found' });
      }

      donation.donors.push({ name: donorName, amount });
      await donation.save();

      res.status(200).json({ message: 'Donation updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).send("Invalid signature");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));