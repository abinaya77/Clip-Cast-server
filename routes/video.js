const { addVideo, getAllVideos } = require('../controllers/videoControllers');
const { videoUpload } = require('../middlewares/videoUpload');
const router = require('express').Router();
const Video = require('../models/VideoModel');

router.post('/upload', videoUpload.single('video'), addVideo);
router.get('/videos', getAllVideos);

// Add search route
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const videos = await Video.find({ title: { $regex: q, $options: 'i' } });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Error searching videos' });
  }
});

module.exports = router;
