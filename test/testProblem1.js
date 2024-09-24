import createDir from '../problem1.js';
import path from 'path';


const RandomDirectory = path.join(process.cwd(), './jsonFiles');

createDir(RandomDirectory, 4);


