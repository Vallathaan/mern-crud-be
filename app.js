const express= require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const userRoutes= require('./routes/userRoutes')

const app = express();
app.use(bodyParser.json());
app.use(cors);

app.use('/api/user',userRoutes);

module.exports = app;