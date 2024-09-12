import { get } from 'http';
import { dataThree } from './burrito_bowl.mjs';
import { dataFive } from './createMrPickle.mjs';

import { getItemName, getOptionsTest, fieldExistsAndNotEmpty, getOptionsValues, reccomendedCheck, reOptions, reQuantity } from './main.mjs';
import { isGeneratorFunction } from 'util/types';

import { loadAndIterateJsonFiles } from './json_import.mjs';
// import  {fieldExistsAndNotEmpty,getOptionsValues,reccomendedCheck ,reOptions, reQuantity} from './main.mjs'


// {itemName:CREATE SANDWICH,
//     optionList:[
//         {option_name:BREAD CHOICE,
//             subtitle/min/max:'1 manx 1 min whatever',
//             option_values : [WHEAT, CHEESEY]
//         }
//                ]
// }


// async function loadAndIterateJsonFiles(directoryPath) {
//   try {
//     // Read all files in the directory
//     const files = await fs.readdir(directoryPath);
//     console.log(files)
    
//     // Filter for JSON files
//     const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
    
//     // Iterate through each JSON file
//     for (const file of jsonFiles) {
//       const filePath = path.join(directoryPath, file);
      
//       // Read and parse the JSON file
//       const jsonContent = await fs.readFile(filePath, 'utf8');
//       const jsonData = JSON.parse(jsonContent);
      
//       // Process the JSON data here
//       console.log(`Processing ${file}:`);
//       console.log(jsonData);
      
//       // You can add your own logic here to work with the JSON data
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }




const megaItem = {
    itemName:'',
    optionList:[],

}
const target_item = dataThree

megaItem.itemName = getItemName(target_item)
createOption(target_item)












function recursive_hellscape(top_option,masterlist){
    const optionObject = {}
    // console.log('-----------------')
    // console.log(top_option)

    //name
    optionObject.name = top_option.name

    //subtitle
    optionObject.subtitle = getOptionsValues(top_option)

    //options

    // console.log(top_option)

    // console.log(top_option.name)

        optionObject.OptionValue = top_option.options.map(option => {
            // console.log(option.name)
            if (fieldExistsAndNotEmpty(option.nestedExtrasList)) {
                console.log('starting recursion')
                
                option.nestedExtrasList.map(option2 => 
                    recursive_hellscape(option2,masterlist))
                
            } else {
                return option.name;
            }
        }).filter(option => option !== undefined); // removed undefined values from optionValue array
    
    masterlist.optionList.push(optionObject)
    }






function createOption (data){
    const optionLists = data.data.itemPage.optionLists;
    for(let i = 0; i < optionLists.length; i++) {
    
       recursive_hellscape(optionLists[i],megaItem)
    }
    }
    


    const removeDuplicates = (array) => {
        const uniqueMap = new Map();
      
        return array.filter(item => {
          const key = JSON.stringify({
            name: item.name,
            subtitle: item.subtitle,
            OptionValue: item.OptionValue.sort().join(',')
          });
      
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, true);
            return true;
          }
          return false;
        });
      };
      
      // Usage
      const originalArray = megaItem.optionList;
      const uniqueArray = removeDuplicates(originalArray);
      
      console.log(uniqueArray.length); // Number of unique items
      console.log(JSON.stringify(uniqueArray, null, 2)); // Pretty-print the result

// choose your filling
//subtitle: choose one
//options: chicken, steak, beef barbacoa, carnitas, sofritas, veggie
  //option[0].nestedExtrasList
     // beans 
     // rice
     // toppings
     // extras
 



// burrito bowl

//choose your filling
//subtitle: choose one
//options: chicken, steak, beef barbacoa, carnitas, sofritas, veggie

// choose your rice
//subtitle: choose one
//options: white rice, brown rice

// choose your beans
//subtitle: choose one
//options: black beans, pinto beans

// choose your toppings
//subtitle: choose as many as you like
//options: fajita veggies, salsa, sour cream, cheese, guacamole, lettuce

// choose your extras filling
//subtitle: choose as many as you like
//options: queso, extra meat, extra guacamole, chips & salsa
















// function getOptionsTest(data) {
//     const optionLists = data.data.itemPage.optionLists;
//     const categories = {};
//     let nestedCategories = {};
//     for(let i = 0; i < optionLists.length; i++) {
//         if(reccomendedCheck(optionLists[i])) {
//             continue;
//         }
//         const categoryName = optionLists[i].name;
//         //returns an array with the name field for each element in optionlists[i].options array
//         const options = optionLists[i].options.map(option => option.name);
//         categories[categoryName] = options;
        


//          nestedCategories =  reOptions(optionLists[i].options,nestedCategories)
//     }
//     console.log(categories);
//     console.log(nestedCategories)
//     return categories;
// }










// ITEM NAME
// Main OPTION NAME
// subtitle min max
// inner options 
//&(^&*&^(*&%^ ) SPECIAL CASE SUBTITLE AND MIN MAX


// CREATE SANDWICH

// BREAD CHOICE
// SUBTITLE MIN MAX
// WHEAT
// CHEESEY


// CHEESE CHOICE
// SUBTITLE MIN MAX
// AMERICAN
// SWISS

// MEAT CHOICE
// SUBTITLE MIN MAX
// TURKEY
// HAM

// EXTRAS
// SUBTITLE MIN MAX
// lettuce
// tomato


// SAUCES
// SUBTITLE AND MIN MAX
// ranch
// mayo

// EXTRA MEAT
// SUBTITLE AND MIN MAX
// turkey
// ham


//--------------------------------------



