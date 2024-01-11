const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express();

const groceryRouter = require('./routes/groceryRouter')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/grocery', groceryRouter)

module.exports = app