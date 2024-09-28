const fs = require('fs')
const path = require('path');

function createDir(dirPath, callback) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.error("error to create directory", err)
        } else {
            console.log("Directory created successfully");
            callback()
        }
    })
}


function createRandomFiles(dirPath, numFiles, callback) {
    let files = [];
    let counter =0

    for (let i = 0; i < numFiles; i++) {
        const filepath = path.join(dirPath, `randomFile${i}.json`);
        const data = JSON.stringify({ id: i, name: `random ${i}` });
        fs.writeFile(filepath, data, (err) => {
            if (err) {
                console.error(err);

            }
            else {
                console.log("file created successfully");
                
                files.push(filepath);
            }
            counter++;

            if (counter === numFiles) {
                callback(files);
               
            }
        });

    }
}



function deleteRandomFiles(paths) {
    paths.forEach(file => {
        fs.unlink(file, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("file deleted successfully....");

            }
        })
    });
}

module.exports = { createDir, createRandomFiles, deleteRandomFiles }




