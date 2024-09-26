import fs from 'fs/promises'; 
import path from 'path';

function createDir(dirPath) {
    return fs.mkdir(dirPath, { recursive: true })
    .then(()=>{
        console.log('Directory created');
       
    })
    .catch((err)=>{
        console.error(err);
    })
}



function createRandomFiles(dirPath, numFiles) {
    const filePaths = []; 
    const filePromises = []; 

    for (let i = 0; i < numFiles; i++) {
        const filepath = path.join(dirPath, `randomFile${i}.json`);
        const data = JSON.stringify({ id: i, name: `random ${i}` });

        const filePromise = fs.writeFile(filepath, data)
            .then(() => {
                console.log("File created successfully:", filepath);
                filePaths.push(filepath);
            })
            .catch(err => {
                console.error(err);
            });

        filePromises.push(filePromise); 
    }

    return Promise.all(filePromises)
        .then(()=>{
            return filePaths
        })
        .catch(err => {
            console.error(err);
        });
}

function deleteRandomFiles(dirPath, filePaths) {
    let fileDeletedPromises = [];

    for (const filepath of filePaths) {
        const filePathList = filepath; 
        const deletePromise = fs.unlink(filePathList)
            .then(() => {
                console.log("File deleted:", filepath);
            })
            .catch((err) => {
                console.error(err);
            });
        fileDeletedPromises.push(deletePromise); 
    }

    return Promise.all(fileDeletedPromises)
        .then(() => {
            console.log("All files deleted");
        })
        .catch(err => {
            console.error(err);
        });
}


export{createDir,createRandomFiles,deleteRandomFiles}