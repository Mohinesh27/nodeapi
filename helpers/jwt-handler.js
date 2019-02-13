const expressJwt= require('express-jwt');
const config=require('../config/development.json');
let CONFIG = require('config');
let secret=CONFIG.get('secret');