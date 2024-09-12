// const fs = require('fs').promises;
// const path = require('path');

import { promises as fs } from 'fs';
import path from 'path';

export async function loadAndIterateJsonFiles(directoryPath) {
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
      
      console.log('-------------------');
      console.log(findDepth(jsonData));

      // console.log(jsonData);
      
      // You can add your own logic here to work with the JSON data
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function findDepth(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return 0;
  }

  let maxDepth = 0;
  for (const key in obj) { 
    const depth = findDepth(obj[key]) + 1;
    maxDepth = Math.max(maxDepth, depth);
  }

  return maxDepth;
}

const myJSON = {
  "name": "John",
  "age": 30,
  "address": {
    "street": "Main Street",
    "city": "Anytown"
  }
};

// console.log(findDepth(myJSON)); // Output: 2



// Usage example
const directoryPath = './data';
loadAndIterateJsonFiles(directoryPath);