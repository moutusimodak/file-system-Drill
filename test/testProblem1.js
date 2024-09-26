import { createDir, createRandomFiles, deleteRandomFiles } from '../problem1.js'
import path from 'path';

const RandomDirectory = path.join(process.cwd(), './jsonFiles');

createDir(RandomDirectory) 
    .then(() => {
        return createRandomFiles(RandomDirectory, 4);
    })
    .then((filePaths) => {
        return deleteRandomFiles(RandomDirectory,filePaths);
    })
    .catch((err) => {
        console.error(err);
    });



