import { createDirectory, createRandomFiles, deleteRandomFiles } from '../problem1.js';
import path from 'path';


const RandomDirectory = path.join(process.cwd(), './jsonFiles');

createDirectory(RandomDirectory)
    .then(() => {
        console.log("directory created successfully");
        return createRandomFiles(RandomDirectory, 4)
    })
    .then((filePaths) => {
        console.log("files created");
        return deleteRandomFiles(filePaths)

    })
    .then((deletedFiles) => {
        console.log(deletedFiles);

    }).catch((err) => {
        console.error(err);

    })
