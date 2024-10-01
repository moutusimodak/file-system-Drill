import fs from 'fs/promises';
import path from 'path';


//1. Read the given file lipsum.txt

function problem2(filepath) {

    return fs.readFile(filepath, 'utf-8')
        .then((data) => {
            console.log("File read Successfully", data);
            return ConvertedUpperCase(data)
        })
        .catch((err) => {
            console.error("error to read a file", err);

        })

}


//2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

function ConvertedUpperCase(data) {
    const upperCaseData = data.toUpperCase();
    let newFileName = 'filename1.txt'
    let newPath = path.join(process.cwd(), newFileName)

    return fs.writeFile(newPath, upperCaseData)
        .then(() => {
            console.log("Successfully written");

            return fs.appendFile('filenames.txt', newFileName + '\n', () => { })

               

        })
        .then(() => {
            console.log("file appended successfully");
            
            return ConvertedToLowerCase(newPath);
        })

        .catch((err) => {
            console.error(err);

        })
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

function ConvertedToLowerCase(filePath) {

    return fs.readFile(filePath, 'utf-8')
        .then((upperCaseData) => {
            console.log("Successfully read:", upperCaseData);

            const lowerCaseData = upperCaseData.toLowerCase();
            const newFileName = 'filename2.txt';
            const newPath = path.join(process.cwd(), newFileName);


            return fs.writeFile(newPath, lowerCaseData)
                .then(() => {
                    console.log("Written Successfully to");
                    return fs.appendFile('filenames.txt', newFileName + '\n');
                })
                .then(() => {
                    return sortedContent(newFileName)
                })
        })
        .catch((err) => {
            console.error(err);

        })

}




// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
function sortedContent(newFileName, newPath) {


    return fs.readFile(newFileName, 'utf-8')
        .then((lowerCaseData) => {
            console.log("Reading ");
            const sortedData = lowerCaseData.split('').sort().join('');

            let newFile = 'filename3.txt';
            let newPath = path.join(process.cwd(), newFile)

            return fs.writeFile(newPath, sortedData)
                .then(() => {
                    return fs.appendFile('filenames.txt', newFile + '\n', () => { });
                })
                .then(() => {
                    return deleteAllFiles()
                })
        })
        .catch((err) => {
            console.error(err);

        })

}






// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

function deleteAllFiles() {

    return fs.readFile('filenames.txt', 'utf-8')
        .then((data) => {
            console.log("successfully read");
            const filenames = data.split('\n').filter(Boolean)
            const deletePromises = filenames.map((filename) => {
                const filePath = path.join(process.cwd(), filename);
                return fs.unlink(filePath)
                    .then(() => {
                        console.log("Deleted:", filename);
                    })
                    .catch((err) => {
                        console.error("Error deleting");
                    });
            });

            return Promise.all(deletePromises);
        })
        .catch((err) => {
            console.error("Error reading filenames:", err);
        });
}

export { problem2 };



