const CreateDir = require('../problem1'); 
const path = require('path');

const RandomDirectory = path.join(__dirname, './jsonFiles');


CreateDir(RandomDirectory, 4);
