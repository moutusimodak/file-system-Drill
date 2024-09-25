import { readTextFile, convertedToUpperCase, convertedToLowerCase, sortedContent, deleteAllFiles } from '../problem2.js';
import path from 'path';


let filepath = path.join('../data/lipsum.txt');


readTextFile(filepath)
    .then((data) => {
        console.log("file read successfully", data);
        return convertedToUpperCase(data)
    })

    .then((upperCaseData) => {
        console.log("written to filename1.txt", upperCaseData);
        return convertedToLowerCase("filename1.txt")

    })

    .then((lowerCaseData) => {
        console.log("written to filename2.txt", lowerCaseData);
        return sortedContent("filename2.txt");
    })

    .then((sortedData) => {
        console.log("written to filename3.txt", sortedData);
        return deleteAllFiles('filenames.txt');
    })

    .then((deletedFiles) => {
        console.log("Deleted", deletedFiles);

    })

    .catch((err) => {
        console.error("Error occurred : ", err);

    })