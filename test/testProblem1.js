
const { createDir, createRandomFiles, deleteRandomFiles } = require("../problem1");

const path = require('path');
const RandomDirectory = path.join(__dirname, './jsonFiles');


createDir(RandomDirectory, () => {

    createRandomFiles(RandomDirectory, 4, (files) => {

        console.log(files);

        deleteRandomFiles(files)
    })
});
