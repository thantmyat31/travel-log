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
})

module.exports = router;