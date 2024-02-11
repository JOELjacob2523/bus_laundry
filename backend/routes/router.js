const router = require('express').Router();
const CONTORLLER = require('../controller/info')
const multer = require('multer');
const upload = multer();

router.post('/user_info', upload.fields([]), async (req, res, next) => {
    try{
        console.log('Data from route:', req.body)
        await CONTORLLER.insertUserInfo(req.body)
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error inserting user credentials:', err)
        res.status(500).json({ success: false, error: err.message });
    }
})

module.exports = router;