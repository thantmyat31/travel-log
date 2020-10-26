const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
require('dotenv').config();

const logs = require('./api/logs');


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

const PORT = process.env.PORT || 1337;

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running'
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT, () => { console.log(`Server is running on PORT: ${PORT}`) });