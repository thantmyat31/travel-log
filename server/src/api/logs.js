const express = require('express');
const router = express.Router();
const LogEntry = require('./../models/logEntry');

router.get('/', async (req, res, next) => {
    try {
        const response = await LogEntry.find();
        res.json(response);
    } catch(error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if(error.name === 'validationError') res.status(422); 
        next(error);
    }
});

// router.post('/update', async (req, res, next) => {
//     try {
//         const response = await LogEntry.findByIdAndUpdate({_id: "5f927b01bce3d046905cd56f"}, { "title": "Mingaladon", "comments": "Awesome place nearly Yangon", "image": "https://upload.wikimedia.org/wikipedia/commons/0/07/Mingaladon_Twp%2C_Yangon%2C_Myanmar_%28Burma%29_-_panoramio_%283%29.jpg", "latitude": "16.99695", "longitude": "96.142095" });
//         res.json(response);
//     } catch(error) {
//         next(error);
//     }
// });

module.exports = router;