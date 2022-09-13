require('dotenv').config()

const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000;

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const photoRoute = require('./routes/photo')
const todoRoute = require('./routes/todo')

app.use('/api/photos', photoRoute);
app.use('/api/todos', todoRoute);

process.on('warning', e => console.warn(e.stack));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})