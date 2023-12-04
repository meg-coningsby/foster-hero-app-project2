const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-sessiom');
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
require('./config/passport');
