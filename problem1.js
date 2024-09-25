const fs = require('fs')
const path = require('path');

function CreateDir(dirPath, numFiles) {
    fs.mkdir(dirPath, (err) => {
        if (err) {
            console.error("error to create directory", err)
        } else {
            console.log("Directory created successfully");
            createRandomFiles(dirPath, numFiles)
        }
    })
}
    

function createRandomFiles(dirPath, numFiles) {
    for (let i = 0; i < numFiles; i++) {

        const filepath = path.join(dirPath, `randomFile${i}.json`);
        const data = JSON.stringify({ id: i, name: `random ${i}` })

        fs.writeFile(filepath, data, (err) => {
            if (err) {
                console.error("Error to create files", err)
            } else {
                console.log("File created successfully", filepath);
                DeleteRandomFiles(filepath)
            }

        })
}

    
        
function DeleteRandomFiles(filepath) {
    fs.unlink(filepath, function (err) {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
            console.log("File deleted:", filepath);
        }
    });

}
}



module.exports = CreateDir




