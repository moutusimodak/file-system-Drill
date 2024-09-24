const fs = await import("fs/promises");
import path from 'path';

async function createDir(dirPath, numFiles) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log("Directory created successfully");
        await createRandomFiles(dirPath, numFiles);
    } catch (err) {
        console.error("Error creating directory:", err);
    }
}

async function createRandomFiles(dirPath, numFiles) {
    const filePaths = []; 

    for (let i = 0; i < numFiles; i++) {
        const filepath = path.join(dirPath, `randomFile${i}.json`);
        const data = JSON.stringify({ id: i, name: `random ${i}` });

        try {
            await fs.writeFile(filepath, data);
            console.log("File created successfully:", filepath);
            filePaths.push(filepath); 
        } catch (err) {
            console.error("Error creating file:", err);
        }
    }

    await deleteRandomFiles(filePaths); 
}

async function deleteRandomFiles(filePaths) {
    for (const filepath of filePaths) {
        try {
            await fs.unlink(filepath);
            console.log("File deleted:", filepath);
        } catch (err) {
            console.error("Error deleting file:", err);
        }
    }
}

export default createDir;
