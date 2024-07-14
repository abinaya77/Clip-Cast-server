const express = require('express');
const router = express.Router();
const Video = require('../models/VideoModel'); // Update the path if necessary

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    console.log(searchTerm)
    const videos = await Video.find({ title: { $regex: searchTerm, $options: 'i' } });
    res.json(videos);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


