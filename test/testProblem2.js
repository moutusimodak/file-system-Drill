const { readDataFile, convertedToUpperCase, convertedToLowerCase, sortedContent, deleteAllFiles } = require("../problem2");

let filePath = "../data/lipsum.txt";

readDataFile(filePath, (data) => {

    convertedToUpperCase(data, (upperCaseFilePath) => {

        convertedToLowerCase(upperCaseFilePath, (lowerCaseFilePath) => {
            
            sortedContent(lowerCaseFilePath, (newFileData) => {

                deleteAllFiles(newFileData)

            })
        });
    });
});


