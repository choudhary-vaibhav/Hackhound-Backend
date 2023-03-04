const express = require('express');
const app = express();

require('dotenv').config();
require('./configs/mongodb');

app.use(express.json());  //middleware to parse json
app.use(express.urlencoded());

app.use('/',require('./routers/userRouter')); //dynamic routing

const port = process.env.PORT || 1010;

app.listen(port, () => console.log('Server running at ' + port + '...'));
