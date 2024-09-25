import fs from 'fs';
import path from 'path';

//1. Read the given file lipsum.txt

function readTextFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

//2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

function convertedToUpperCase(data) {
    return new Promise((resolve, reject) => {
        let upperCaseData = data.toUpperCase()
        let newFileName = 'filename1.txt'
        let newPath = path.join(process.cwd(), newFileName)
        fs.writeFile(newPath, upperCaseData, (err) => {
            if (err) {
                reject(err)
            }
            fs.appendFile('filenames.txt', newFileName + '\n', (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(upperCaseData);
            });
        })

    })

}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

function convertedToLowerCase(filePath) {

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, upperCaseData) => {
            if (err) {
                reject(err)

            } else {
                let lowerCaseData = upperCaseData.toLowerCase();
                const newFileName = 'filename2.txt';
                const newPath = path.join(process.cwd(), newFileName);
                fs.writeFile(newPath, lowerCaseData, (err) => {
                    if (err) {
                        reject(err)
                    }
                    fs.appendFile('filenames.txt', newFileName + '\n', (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(lowerCaseData);
                    });
                })
            }
        })
    })

}



// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
function sortedContent(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (err, lowerCaseData) => {


            if (err) {
                reject(err)
            }
            else {
                let sortedData = lowerCaseData.split('').sort().join('');
                let newFile = 'filename3.txt';
                let newPath = path.join(process.cwd(), newFile)

                fs.writeFile(newPath, sortedData, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.appendFile('filenames.txt', newFile + '\n', (err) => {
                            if (err) {
                                return reject(err);
                            }
                            else {
                                resolve(sortedData);
                            }

                        });
                    }
                })
            }
        })
    })
}


// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

function deleteAllFiles() {

    return new Promise((resolve, reject) => {
        fs.readFile('filenames.txt', 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                let fileNames = data.split('\n').filter(Boolean)
                let deleteCount = 0
                if (fileNames.length === deleteCount) {
                    resolve("No files to delete")
                }
                for (const fileName of fileNames) {

                    const filePath = path.join(process.cwd(), fileName);
                    fs.unlink(filePath, function (err) {
                        if (err) {
                            reject(err)
                        } else {
                            deleteCount++
                            if (deleteCount === fileNames.length) {
                                resolve("all files are deleted")
                            }

                        }
                    })
                }
            }
        })
    })
}






export { readTextFile, convertedToUpperCase, convertedToLowerCase, sortedContent, deleteAllFiles };