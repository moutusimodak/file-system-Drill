const fs = require('fs')
const path = require('path');

//1. Read the given file lipsum.txt

function problem2(filepath) {
   // let filename = path.basename(filepath);
    fs.readFile(filepath,'utf-8',(err, data)=>{
        if(err){
            console.error("Error to read a file ", err);
            
        }
        else{
            console.log("File read successfully : ", data);
            ConvertedUpperCase(data)
        }
    })
    
}




//2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

function ConvertedUpperCase(data) {
    const upperCaseData = data.toUpperCase();
    let newFileName = 'filename1.txt'
    let newPath = path.join(__dirname,newFileName)
    // console.log(upperCaseData);
    fs.writeFile(newPath,upperCaseData,(err)=>{
        if(err){
            console.error("Error to write in a file", err);
            
        }
        else{
            console.log("Successfully written");
            fs.appendFile('filenames.txt', newFileName + '\n', () => {});
            ConvertedToLowerCase(newPath)
        }
    })
}

 // 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

  function ConvertedToLowerCase(newFileName) {
    fs.readFile(newFileName, 'utf-8',(err,upperCaseData)=>{
        if (err) {
            console.error("Error : ", err); 
        }else{
            console.log("Successfully read : ", upperCaseData);
            
        }
        const lowerCaseData = upperCaseData.toLowerCase();
    let newFile = 'filename2.txt'
    let newPath = path.join(__dirname,newFile)
    // console.log("checking",lowerCaseData);
    fs.writeFile(newPath,lowerCaseData,(err)=>{
        if (err) {
            console.error("Error to write : ", err);
            
        }else{
            console.log("Written Successfully");
            fs.appendFile('filenames.txt', newFile + '\n', () => {});
            sortedContent(newPath);
        }
    })
    })
    
  }


  // 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
 function sortedContent(newFileName, newPath) {
    fs.readFile(newFileName,'utf-8', (err, lowerCaseData)=>{

        if(err){
            console.error("Error to read a file : ", err);
        }else{
            console.log("Reading : ", lowerCaseData);
            
        }
        
        const sorteddata = lowerCaseData.split('.').sort().join('.');
        console.log("sorted content is : ",sorteddata);
        let newFile = 'filename3.txt';
        let newPath = path.join(__dirname,newFile)
        fs.writeFile(newPath,sorteddata,(err)=>{
            if (err) {
                console.error("Error : ", err);
                
            }else{
                console.log("Successfully written the data");
                fs.appendFile('filenames.txt', newFile + '\n', () => {});
                deleteAllFiles(sorteddata)
            }
        })
        
    })
}
 
// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

function deleteAllFiles() {
    fs.readFile('filenames.txt', 'utf-8', (err, sorteddata) => {
        if (err) {
            console.error("Error reading filenames.txt:", err);
        }
        
        console.log("Successfully read:", sorteddata);
        
        const filenames = sorteddata.split('\n').filter(Boolean); 
       

        filenames.forEach((filename) => {
            const filePath = path.join(__dirname, filename);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("Deleted:", filename);

                }
            });
        });
    });
}

 module.exports = problem2