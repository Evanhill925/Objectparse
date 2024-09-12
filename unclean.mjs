import { get } from 'http';
import { dataThree } from './burrito_bowl.mjs';
import { dataFive } from './createMrPickle.mjs';

import { getItemName, getOptionsTest, fieldExistsAndNotEmpty, getOptionsValues, reccomendedCheck, reOptions, reQuantity } from './main.mjs';
// import  {fieldExistsAndNotEmpty,getOptionsValues,reccomendedCheck ,reOptions, reQuantity} from './main.mjs'


// {itemName:CREATE SANDWICH,
//     optionList:[
//         {option_name:BREAD CHOICE,
//             subtitle/min/max:'1 manx 1 min whatever',
//             option_values : [WHEAT, CHEESEY]
//         }
//                ]
// }

const megaItem = {
    itemName:'',
    optionList:[],

}
const target_item = dataThree

megaItem.itemName = getItemName(target_item)
createOption(target_item)


function createOption (data){
const optionLists = data.data.itemPage.optionLists;
for(let i = 0; i < optionLists.length; i++) {

    // individual option object
    const option = {}

    if(reccomendedCheck(optionLists[i])) {
        continue;
    }

    // get name
    option.optionName = optionLists[i].name

    // get subtitles
    
    option.subtitle = getOptionsValues(optionLists[i])

    // get options
    option.OptionValue = optionLists[i].options.map(option => {
        if (fieldExistsAndNotEmpty(option.nestedExtrasList)) {
            return
            
        } else {
            return option.name;
        }
    }).filter(option => option !== undefined); // removed undefined values from optionValue array

    
    
    // megaItem.optionList.push(option)



    // handle nested

   let nestedOptionArray = optionLists[i].options.map(inneroption => {
        if (fieldExistsAndNotEmpty(inneroption.nestedExtrasList)) {

            const nestedOption = {}
            

            

            //nested name
            nestedOption.optionName = inneroption.name
            

            //nested subtitle

            // nestedOption.subtitle = getOptionsValues(option.nestedExtrasList)
            nestedOption.subtitle = getOptionsValues(inneroption.nestedExtrasList[0])
            

            // //nested options
            nestedOption.OptionValue = inneroption.nestedExtrasList.map(nested => nested.options.map(option => option.name))
            // nestedOption.

            option.OptionValue.push(nestedOption)
        } 
        else {
            return;
        }
        }).filter(option => option !== undefined); // removed undefined values from optionValue array
    
            megaItem.optionList.push(option)


}
}

// console.log(megaItem.itemName)
// for (let i = 0; i<megaItem.optionList.length;i++){
//     console.log(megaItem.optionList[i])
// }

console.log(JSON.stringify(megaItem))






























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



