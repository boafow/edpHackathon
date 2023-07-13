//set up boilerplate for server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3002;
//set up connection to the mongo client