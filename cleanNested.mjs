import { get } from 'http';
import { dataThree } from './burrito_bowl.mjs';
import { dataFive } from './createMrPickle.mjs';

import { getItemName, getOptionsTest, fieldExistsAndNotEmpty, getOptionsValues, reccomendedCheck, reOptions, reQuantity } from './main.mjs';
import { isGeneratorFunction } from 'util/types';
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
    
    // option.subtitle = getOptionsValues(optionLists[i])

    // get options
    

    //if WHATEVER CONDITION CHECKS THE OBJECT TYPE DO THIS FOR BURRITO OR DO THE BELOW CODE FOR SANDWHICH
    option.OptionValue = optionLists[i].options.map(option => option.name)

    // option.OptionValue = optionLists[i].options.map(option => {
    //     if (fieldExistsAndNotEmpty(option.nestedExtrasList)) {
    //         // return option.name
        
            
    //     } else {
    //         return option.name;
    //     }
    // }).filter(option => option !== undefined); // removed undefined values from optionValue array

    
    
    megaItem.optionList.push(option)



    // handle nested

   let nestedOptionArray = optionLists[i].options.map(option => {
        if (fieldExistsAndNotEmpty(option.nestedExtrasList)) {

            const nestedOption = {}

            

            //nested name

            // nestedOption.optionName = option.name // THIS BREAKS OPTION NAME

            // for(let i = 0; i < option.nestedExtrasList.length; i++){
            //     nestedOption.optionName = option.nestedExtrasList[i].name
            //     console.log(nestedOption.optionName, "test")
            // }
           
            nestedOption.optionName = option.nestedExtrasList.map(nested => nested.name)

            //nested subtitle
            
            for(let i = 0; i < option.nestedExtrasList.length; i++){
            // nestedOption.subtitle = option.nestedExtrasList.map(nested => nested.subtitle)
            nestedOption.subtitle = option.nestedExtrasList[i].subtitle
            }
            // console.log(getOptionsValues(option.nestedExtrasList[0]), "HERE") 
            // nestedOption.subtitle = getOptionsValues(option.nestedExtrasList)
            // nestedOption.subtitle = getOptionsValues(option.nestedExtrasList[0])
            

            //nested options
        
            // if(option.nestedExtrasList.length > 1){
    
            //     for(let i = 0; i < option.nestedExtrasList.length; i++){
            //         nestedOptionArray.push(nestedOption.OptionValue = option.nestedExtrasList[i].options.map(nested => nested.name))
                  
    

            //     }
                
            // }
            // else{
            //     nestedOption.OptionValue = option.nestedExtrasList[0].options.map(nested => nested.name)
            // }
            let optionsArray = []
            let optionArrayValue = {}
     
            for(let i = 0; i < option.nestedExtrasList.length; i++){
            option.nestedExtrasList[i].options.map(nested => optionsArray.push(nested.name))
            nestedOption.optionValue = optionsArray
        }
        
        
            megaItem.optionList.push(nestedOption)
           
        } 



        else {

            return;
        }
        
        }).filter(option => option !== undefined); // removed undefined values from optionValue array

        }


// function uniq(a) {
//     var seen = {};
//     return a.filter(function(item) {
//         return seen.hasOwnProperty(item) ? false : (seen[item] = true);
//     });
// }




// this prints to console the mega item
console.log(megaItem.itemName)
for (let i = 0; i<megaItem.optionList.length;i++){
    console.log(megaItem.optionList[i])
}
}

// function recursive_hellscape(top_option,masterlist){
//     const optionObject = {}

//     //name
//     optionObject.name = top_option.name

//     //subtitle
//     optionObject.subtitle = getOptionsValues(top_option)

//     //options

//     // console.log(top_option)
    

    //     optionObject.OptionValue = top_option.options.map(option => {
    //         if (fieldExistsAndNotEmpty(option.nestedExtrasList)) {
    //             recursive_hellscape(option.nestedExtrasList,masterlist)
                
    //         } else {
    //             return option.name;
    //         }
    //     }).filter(option => option !== undefined); // removed undefined values from optionValue array
    
    // masterlist.optionList.push(optionObject)
    // }






// function createOption (data){
//     const optionLists = data.data.itemPage.optionLists;
//     for(let i = 0; i < optionLists.length; i++) {
    
//        recursive_hellscape(optionLists[i],megaItem)
//     }
//     }
    




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



