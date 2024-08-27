const fs = require('fs').promises;
const path = require('path');


async function loadAndIterateJsonFiles(directoryPath) {
  try {
    // Read all files in the directory
    const files = await fs.readdir(directoryPath);
    console.log(files)
    
    // Filter for JSON files
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
    
    // Iterate through each JSON file
    for (const file of jsonFiles) {
      const filePath = path.join(directoryPath, file);
      
      // Read and parse the JSON file
      const jsonContent = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(jsonContent);
      
      // Process the JSON data here
      console.log(`Processing ${file}:`);
      console.log(jsonData);
      
      // You can add your own logic here to work with the JSON data
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Usage example
const directoryPath = './data';
loadAndIterateJsonFiles(directoryPath);