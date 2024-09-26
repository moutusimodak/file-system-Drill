import { problem2 } from '../problem2.js';

const filepath = "../data/lipsum.txt";

problem2(filepath)
    .then(() => {
        console.log("Processing completed successfully.");
    })
    .catch((error) => {
        console.error("Error during processing:", error);
    });