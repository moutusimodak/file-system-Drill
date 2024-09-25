import fs from 'fs';
import path from 'path';

function createDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(dirPath);
            }
        });
    });
}

function createRandomFiles(dirPath, numFiles) {
    let filePromises = [];

    for (let i = 0; i < numFiles; i++) {
        const filepath = path.join(dirPath, `randomFile${i}.json`);
        const data = JSON.stringify({ id: i, name: `random ${i}` });
        const allFilePromises = new Promise((resolve, reject) => {
            fs.writeFile(filepath, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filepath); 
                }
            });
        });

        filePromises.push(allFilePromises); 
    }

    return Promise.all(filePromises).then(() => dirPath); 
}

function deleteRandomFiles(dirPath) {
    let fileDeletedPromises = [];

    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, filePaths) => {
            if (err) {
                reject(err);
            } else {
                for (const filePath of filePaths) {
                    let filePathList = path.join(dirPath, filePath);

                    const deletePromise = new Promise((resolve, reject) => {
                        fs.unlink(filePathList, (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(); 
                            }
                        });
                    });

                    fileDeletedPromises.push(deletePromise); 
                }

                Promise.all(fileDeletedPromises)
                    .then(() => resolve("All files deleted"))
                    .catch(reject); 
            }
        });
    });
}

export { createDirectory, createRandomFiles, deleteRandomFiles };
