const express = require('express')
const { getConnection } = require('./db/db-conect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT;

//Implementación de Cors
app.use(cors());

getConnection();

//Parseo de datos a Json
app.use(express.json());

app.use('/genero', require('./router/genero'));
app.use('/director', require('./router/director'));
app.use('/productora', require('./router/productora'));
app.use('/tipo', require('./router/tipo'));


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })