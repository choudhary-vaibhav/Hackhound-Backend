const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./configs/mongodb');

app.use(express.json());  //middleware to parse json
app.use(express.urlencoded());

app.use(require('cors')({origin: '*'}));

app.use('/',require('./routers/baseRouter')); //dynamic routing

const port = process.env.PORT || 1010;

app.listen(port, () => console.log('Server running at ' + port + '...'));
