const multer = require('multer');
const path = require('path')
const uuid = require('uuid').v4;

//destination dir----where to save video...like cloud or aws or localstorage of server (here:local storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'video') {
            const rootDir = path.dirname(require.main.filename);
            cb(null, path.join(rootDir, 'public/').concat('videos'))  //path is set to videos in pubilc folder
        }
    },
    filename: (req, file, cb) => {
        const videoExt = file.mimetype.split('/')[1]   //separting video extension
        const id = uuid()           
        cb(null, "video_" + id + '.' + videoExt)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'video/mp4') {
        cb(null, true)
    }else{
        cb(null, false)
    }
}
exports.videoUpload = multer({storage, fileFilter})