const fs = await import("fs/promises");
import path from 'path';

//1. Read the given file lipsum.txt

async function readSourceFile(filepath) {
    const data = await fs.readFile(filepath, 'utf-8')

    try {

        console.log("File read successfully : ", data);
        await ConvertedUpperCase(data)


     }
    catch (err) {
        console.error("Error to read a file ", err);
    }
}


//2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

async function ConvertedUpperCase(data) {
    const upperCaseData = data.toUpperCase();
    let newFileName = 'filename1.txt'
    let newPath = path.join(process.cwd(), newFileName)

    try {
        console.log("Successfully written");
        fs.appendFile('filenames.txt', newFileName + '\n', () => { });
        await fs.writeFile(newPath, upperCaseData)
        await ConvertedToLowerCase(newPath)

    }
    catch (err) {
        console.error("Error to write in a file", err);


    }
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

async function ConvertedToLowerCase(filePath) {
    try {
        const upperCaseData = await fs.readFile(filePath, 'utf-8');
        console.log("Successfully read:", upperCaseData);

        const lowerCaseData = upperCaseData.toLowerCase();
        const newFileName = 'filename2.txt';
        const newPath = path.join(process.cwd(), newFileName);

        await fs.writeFile(newPath, lowerCaseData);
        console.log("Written Successfully to:", newFileName);
        await fs.appendFile('filenames.txt', newFileName + '\n');

        await sortedContent(newPath);

    } catch (err) {
        console.error("Error reading or writing file:", err);
    }
}




// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
async function sortedContent(newFileName) {

    try {
        const lowerCaseData = await fs.readFile(newFileName, 'utf-8');
       

        const sortedData = lowerCaseData.split('').sort().join('');
      
        console.log("sorted content is : ", sortedData);


        let newFile = 'filename3.txt';
        let newPath = path.join(process.cwd(), newFile)

        await fs.writeFile(newPath, sortedData)
     
        fs.appendFile('filenames.txt', newFile + '\n', () => { });

        await deleteAllFiles(sorteddata)
    }

    catch (err) {
        console.error("Error to read or write a file : ", err);
    }
}




// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

async function deleteAllFiles() {
    try {
        const data = await fs.readFile('filenames.txt', 'utf-8')
        console.log("Successfully read");


        const filenames = data.split('\n').filter(Boolean);

        for (const filename of filenames) {
            const filePath = path.join(process.cwd(), filename);

            await fs.unlink(filePath);
            console.log("Deleted:", filename);
        }
    }

    catch (err) {
        console.error(err);

    }

}

export default readSourceFile;



