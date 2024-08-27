
import { dataThree } from './burrito_bowl.mjs';
import { dataFive } from './createMrPickle.mjs';


function getItemName(data){
    const itemName= data.data.itemPage.itemHeader.name;
    console.log(itemName);
}
function getOptions(data) {
    const optionLists = data.data.itemPage.optionLists;
    const categories = {};
    for(let i = 0; i < optionLists.length; i++) {
        if(optionLists[i].name.includes("Recommended")) {
            continue;
        }
        const categoryName = optionLists[i].name;
        // “${subtitle} the minimum option ${minOption} and the maximum${if(maxOption > 10){ return 10{ maxOption}
        const options = optionLists[i].options.map(option => option.name);

        categories[categoryName] = options;
}
console.log(categories);
return categories;
}

function getOptionQuantity(data) {
    const optionLists = data.data.itemPage.optionLists;
    let quantityLimit = "";
    for(let i = 0; i < optionLists.length; i++) {
        if(optionLists[i].maxNumOptions == 0) {
            continue;
        }
    const minOption = optionLists[i].minNumOptions;
    const maxOption = optionLists[i].maxNumOptions;
    const optionSub = optionLists[i].subtitle;
    console.log(`${optionSub}. The minimum option is ${minOption} and the maximum option is ${maxOption}`);
    quantityLimit = `${optionSub}. The minimum option is ${minOption} and the maximum option is ${maxOption}`;
    }
    return quantityLimit;
}
// getOptionQuantity(dataFive);
// getItemName(dataFive);
// getOptions(dataFive);








function fieldExistsAndNotEmpty(field) {
    if (field) {
        const value = field
        
        
        // Check for null or undefined
        if (value == null) {
            return false;
        }
        
        // Check for empty string
        if (typeof value === 'string' && value.trim() === '') {
            return false;
        }
        
        // Check for empty array
        if (Array.isArray(value) && value.length === 0) {
            return false;
        }
        
        // Check for empty object
        if (typeof value === 'object' && Object.keys(value).length === 0) {
            return false;
        }
        
        // If we've made it this far, the field exists and is not empty
        return true;
    }
    
    // Field doesn't exist
    return false;
}

function getOptionsValues(data){
    let subtitle = ''
    let minNumOptions = ''
    let maxNumOptions = ''
    if (fieldExistsAndNotEmpty(data.subtitle)){
    subtitle = data.subtitle
    }
    if (fieldExistsAndNotEmpty(data.minNumOptions)){
        minNumOptions =data.minNumOptions
        }
    if (fieldExistsAndNotEmpty(data.maxNumOptions)){
        maxNumOptions = data.maxNumOptions
        }
    
    if(maxNumOptions > 10 ){
        maxNumOptions = 10
    }
    return `${subtitle}. The minimum option is ${minNumOptions} and the maximum option is ${maxNumOptions}`
}

function reccomendedCheck(myList){
   let optionFilterforRecommendedOrDoubleDash = myList.name.includes("Recommended") || myList.name.includes("DoubleDash")
return optionFilterforRecommendedOrDoubleDash
}







function getNestedOptionsTest(data) {
    const optionLists = data.data.itemPage.optionLists;
    const categories = {};
    for(let i = 0; i < optionLists.length; i++) {
        if (reccomendedCheck(optionLists[i])) {
            continue;
        }
        const categoryName = optionLists[i].name;
        const options = optionLists[i].options.map(option => option.name);
        categories[categoryName] = options;
    }
    return categories;
}

function testNested(data){
    const categories={}
    let mainOptions = []
    const optionLists = data.data.itemPage.optionLists;
    console.log(data.data.itemPage.itemHeader.name)
    for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {
        if (reccomendedCheck(optionLists[i])) {
            continue;
        }
        mainOptions.push(optionLists[0].name, optionLists[i].options.map(option => option.name))
        console.log(mainOptions)
}
for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {   
    const categoryName = optionLists[0].options[0].nestedExtrasList[i].name; 
    const options = optionLists[0].options[0].nestedExtrasList[i].options.map(option => option.name); 
    categories[categoryName] = options;
    }
    console.log(categories)
    return categories  
}

// testNested(dataThree)










function getNestedOptionQuantityTest(data) {
    const optionLists = data.data.itemPage.optionLists;
    console.log(optionLists.length)
    // console.log(optionLists)
    const quantityLimits = [];
    quantityLimits.push(getOptionsValues(optionLists[0]))
//     const mainOptionSub = optionLists[0].subtitle
//     const mainMinOption = optionLists[0].minNumOptions
//     const mainMaxOption = optionLists[0].maxNumOptions
//    quantityLimits.push(`${mainOptionSub}. The minimum option is ${mainMinOption} and the maximum option is ${mainMaxOption}`);
    for(let i = 0; i < optionLists.length; i++) {
        if(optionLists[i].name.includes("Recommended") || optionLists[i].name.includes("DoubleDash")) {
            continue;
        }
        for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {  
        let nestedOption = optionLists[0].options[0].nestedExtrasList[i]
        // const minOption = optionLists[0].options[0].nestedExtrasList[i].minNumOptions;
        // let maxOption = optionLists[0].options[0].nestedExtrasList[i].maxNumOptions;
        // const optionSub = optionLists[0].options[0].nestedExtrasList[i].subtitle;
        // if(maxOption > 10 ){
        //     maxOption = 10
        // }
        // quantityLimits.push(`${optionSub}. The minimum option is ${minOption} and the maximum option is ${maxOption}`);
        quantityLimits.push(getOptionsValues(nestedOption))
    }
}
    console.log(quantityLimits);
    return quantityLimits;
}
getNestedOptionQuantityTest(dataThree);

function reOptions(genOption,innerCategories) {
    for(let i = 0; i <genOption.length; i++) {
        let hasNested= genOption[i].nestedExtrasList
        if (fieldExistsAndNotEmpty(hasNested)){
            const categoryName = genOption[i].name;
            const options =genOption[i].nestedExtrasList[0].options.map(option => option.name);
            innerCategories[categoryName] = options
        
        }

        
    }
    
    return innerCategories

}






function getOptionsTest(data) {
    const optionLists = data.data.itemPage.optionLists;
    const categories = {};
    let nestedCategories = {};
    for(let i = 0; i < optionLists.length; i++) {
        if(reccomendedCheck(optionLists[i])) {
            continue;
        }
        const categoryName = optionLists[i].name;
        //returns an array with the name field for each element in optionlists[i].options array
        const options = optionLists[i].options.map(option => option.name);
        categories[categoryName] = options;
        


         nestedCategories =  reOptions(optionLists[i].options,nestedCategories)
    }
    console.log(categories);
    console.log(nestedCategories)
    return categories;
}

getOptionsTest(dataFive)








function getOptionQuantityTest(data) {
    const optionLists = data.data.itemPage.optionLists;
    const quantityLimits = [];
    for(let i = 0; i < optionLists.length; i++) {
        if(optionLists[i].name.includes("Recommended")|| optionLists[i].name.includes("DoubleDash")) {
            continue;
        }
        const minOption = optionLists[i].minNumOptions;
        const maxOption = optionLists[i].maxNumOptions;
        const optionSub = optionLists[i].subtitle;
        quantityLimits.push(`${optionSub}. The minimum option is ${minOption} and the maximum option is ${maxOption}`);
    }
    return quantityLimits;
}

function combineOptionsAndQuantities(data) {
    const categories = getOptionsTest(data);
    const quantityLimits = getOptionQuantityTest(data);
    
    const result = {};
    let quantityIndex = 0;
    
    for (const [category, options] of Object.entries(categories)) {
        const quantityLimit = quantityLimits[quantityIndex] || '';
        result[category] = [quantityLimit, ...options];
        quantityIndex++;
    }
    return result;
}

// combineOptionsAndQuantities(dataFive)




























// function parse(data) {  
//     let itemOptions = data.data.itemPage.optionLists[0];
//     let response = {
//         name: data.data.itemPage.itemHeader.name,
//         options: [
//             data.data.itemPage.optionLists[0].name,
//             `minimum options ${itemOptions.minNumOptions}`,
//             `max options ${itemOptions.maxNumOptions}`
//         ],
//         price: "test"
//     };

// for(let i = 0; i <  data.data.itemPage.optionLists[0].type.length; i++) {
//     // console.log(data.data.itemPage.optionLists[0].name)
//     console.log("here",data.data.itemPage.optionLists[0].name,data.data.itemPage.optionLists[0].options[i].name)

//     if (itemOptions.isOptional === false) {
//         response.options.push(...itemOptions.options.map(option => {
//             return {
//                 name: option.name
//             };
//         }));
        
//     }

//     const loggedOptions = new Set();

//     itemOptions.options.forEach(option => {
//         option.nestedExtrasList.forEach(nestedOption => {
//             if (!loggedOptions.has(nestedOption.name)) {
//                 response.options.push(nestedOption.name);
//                 loggedOptions.add(nestedOption.name);
//             }
//         });
//     });
// }
// }


// parse(data)


// function test(data) {
//     for (let i = 0; i < data.data.itemPage.optionLists[0].options.length; i++) {
//         console.log("here", data.data.itemPage.optionLists[0].name, data.data.itemPage.optionLists[0].options[i].name);
//     }
// }






// function logStuff(data) {
//     const optionLists = data.data.itemPage.optionLists[0];
//     const categories = new Map();


// function mainOptions() {
//     console.log(`\n--- ${optionLists.name} ---`);
    
  
//     if (optionLists && optionLists.options) {
//         for (let i = 0; i < optionLists.options.length; i++) {
//             if (optionLists.options[i]) {
//                 console.log(optionLists.options[i].name);
//             }
//         }
//     } else {
//         console.error("optionLists or optionLists.options is undefined");
//     }
// }
//     mainOptions(data)
//     function categorizeOptions(options, parentName) {
//         options.forEach(option => {
//             if (option.nestedExtrasList) {
//                 option.nestedExtrasList.forEach(nestedExtra => {
//                     if (nestedExtra.options) {
//                         if (!categories.has(nestedExtra.name)) {
//                             categories.set(nestedExtra.name, new Set());
//                         }
//                         nestedExtra.options.forEach(opt => {
//                             categories.get(nestedExtra.name).add(opt.name);
//                         });
//                     }
//                 });
//             } else {
//                 if (!categories.has(parentName)) {
//                     categories.set(parentName, new Set());
//                 }
//                 categories.get(parentName).add(option.name);
//             }
//         });
//     }

//     function traverseNestedOptions(options) {
//         options.forEach(option => {
//             categorizeOptions([option], 'Main Options');
//             if (option.nestedExtrasList) {
//                 option.nestedExtrasList.forEach(nestedExtra => {
//                     if (nestedExtra.options) {
//                         categorizeOptions(nestedExtra.options, nestedExtra.name);
//                     }
//                 });
//             }
//         });
//     }

//     traverseNestedOptions(optionLists.options);

//     // Print the categories
//     categories.forEach((items, categoryName) => {
//         console.log(`\n--- ${categoryName} ---`);
//         items.forEach(item => console.log(item));
//     });
// }

// logStuff(data);






// function logStuff(data) {
//     const optionLists = data.data.itemPage.optionLists[0];
//     const categories = new Map();

//     function mainOptions() {
//         console.log(`\n--- ${optionLists.name} ---`);
//         console.log(optionLists.subtitle);
//         if (optionLists && optionLists.options) {
//             for (let i = 0; i < optionLists.options.length; i++) {
//                 if (optionLists.options[i]) {
//                     console.log(optionLists.options[i].name);
//                 }
//             }
//         } else {
//             console.error("optionLists or optionLists.options is undefined");
//         }
//     }

//     function categorizeOptions(options, parentName, subtitle) {
//         if (parentName && !categories.has(parentName)) {
//             categories.set(parentName, { options: new Set(), subtitle: subtitle });
//         }
//         options.forEach(option => {
//             if (option.nestedExtrasList) {
//                 option.nestedExtrasList.forEach(nestedExtra => {
//                     if (nestedExtra.options) {
//                         if (!categories.has(nestedExtra.name)) {
//                             categories.set(nestedExtra.name, { options: new Set(), subtitle: nestedExtra.subtitle });
//                         }
//                         nestedExtra.options.forEach(opt => {
//                             categories.get(nestedExtra.name).options.add(opt.name);
//                         });
//                     }
//                 });
//             } else if (parentName) {
//                 categories.get(parentName).options.add(option.name);
//             }
//         });
//     }

//     function traverseNestedOptions(options) {
//         options.forEach(option => {
//             if (option.nestedExtrasList) {
//                 option.nestedExtrasList.forEach(nestedExtra => {
//                     if (nestedExtra.options) {
//                         categorizeOptions(nestedExtra.options, nestedExtra.name, nestedExtra.subtitle);
//                     }
//                 });
//             }
//         });
//     }

//     mainOptions();
//     traverseNestedOptions(optionLists.options);

//     // Print the categories
//     categories.forEach((categoryData, categoryName) => {
//         console.log(`\n--- ${categoryName} ---`);
//         if (categoryData.subtitle !== undefined) {
//             console.log(categoryData.subtitle);
//         }
//         categoryData.options.forEach(item => console.log(item));
//     });
// }

// logStuff(dataFive);

// function logStuff(data) {
//     const optionLists = data.data.itemPage.optionLists;
//     const categories = new Map();

//     function mainOptions(optionList) {
//         console.log(`\n--- ${optionList.name} ---`);
//         console.log(optionList.subtitle);
//         if (optionList && optionList.options) {
//             optionList.options.forEach(option => {
//                 if (option) {
//                     console.log(option.name);
//                 }
//             });
//         } else {
//             console.error("optionList or optionList.options is undefined");
//         }
//     }

//     function categorizeOptions(options, parentName, subtitle) {
//         if (parentName && !categories.has(parentName)) {
//             categories.set(parentName, { options: new Set(), subtitle: subtitle });
//         }
//         options.forEach(option => {
//             if (option.nestedExtrasList && option.nestedExtrasList.length > 0) {
//                 option.nestedExtrasList.forEach(nestedExtra => {
//                     if (nestedExtra.options) {
//                         if (!categories.has(nestedExtra.name)) {
//                             categories.set(nestedExtra.name, { options: new Set(), subtitle: nestedExtra.subtitle });
//                         }
//                         nestedExtra.options.forEach(opt => {
//                             categories.get(nestedExtra.name).options.add(opt.name);
//                         });
//                     }
//                 });
//             } else if (parentName) {
//                 categories.get(parentName).options.add(option.name);
//             }
//         });
//     }

//     function traverseOptions(optionList) {
//         if (optionList.options) {
//             categorizeOptions(optionList.options, optionList.name, optionList.subtitle);
//             optionList.options.forEach(option => {
//                 if (option.nestedExtrasList) {
//                     option.nestedExtrasList.forEach(nestedExtra => {
//                         if (nestedExtra.options) {
//                             categorizeOptions(nestedExtra.options, nestedExtra.name, nestedExtra.subtitle);
//                         }
//                     });
//                 }
//             });
//         }
//     }

//     optionLists.forEach(optionList => {
//         mainOptions(optionList);
//         traverseOptions(optionList);
//     });

//     // Print the categories
//     categories.forEach((categoryData, categoryName) => {
//         console.log(`\n--- ${categoryName} ---`);
//         if (categoryData.subtitle !== undefined) {
//             console.log(categoryData.subtitle);
//         }
//         categoryData.options.forEach(item => console.log(item));
//     });
// }


// function logStuff(data) {
//     const optionLists = data.data.itemPage.optionLists;
//     const categories = new Map();

//     function shouldIncludeCategory(name) {
//         return !name.includes("DoubleDash") && !name.includes("Recommended");
//     }

//     function mainOptions(optionList) {
//         if (shouldIncludeCategory(optionList.name)) {
//             console.log(`\n--- ${optionList.name} ---`);
//             console.log(optionList.subtitle);
//             if (optionList && optionList.options) {
//                 optionList.options.forEach(option => {
//                     if (option) {
//                         console.log(option.name);
//                     }
//                 });
//             } else {
//                 console.error("optionList or optionList.options is undefined");
//             }
//         }
//     }

//     function categorizeOptions(options, parentName, subtitle) {
//         if (parentName && !categories.has(parentName) && shouldIncludeCategory(parentName)) {
//             categories.set(parentName, { options: new Set(), subtitle: subtitle });
//         }
//         options.forEach(option => {
//             if (option.nestedExtrasList && option.nestedExtrasList.length > 0) {
//                 option.nestedExtrasList.forEach(nestedExtra => {
//                     if (nestedExtra.options && shouldIncludeCategory(nestedExtra.name)) {
//                         if (!categories.has(nestedExtra.name)) {
//                             categories.set(nestedExtra.name, { options: new Set(), subtitle: nestedExtra.subtitle });
//                         }
//                         nestedExtra.options.forEach(opt => {
//                             categories.get(nestedExtra.name).options.add(opt.name);
//                         });
//                     }
//                 });
//             } else if (parentName && shouldIncludeCategory(parentName)) {
//                 categories.get(parentName).options.add(option.name);
//             }
//         });
//     }

//     function traverseOptions(optionList) {
//         if (optionList.options && shouldIncludeCategory(optionList.name)) {
//             categorizeOptions(optionList.options, optionList.name, optionList.subtitle);
//             optionList.options.forEach(option => {
//                 if (option.nestedExtrasList) {
//                     option.nestedExtrasList.forEach(nestedExtra => {
//                         if (nestedExtra.options && shouldIncludeCategory(nestedExtra.name)) {
//                             categorizeOptions(nestedExtra.options, nestedExtra.name, nestedExtra.subtitle);
//                         }
//                     });
//                 }
//             });
//         }
//     }

//     optionLists.forEach(optionList => {
//         mainOptions(optionList);
//         traverseOptions(optionList);
//     });

//     // Print the categories
//     categories.forEach((categoryData, categoryName) => {
//         if (shouldIncludeCategory(categoryName)) {
//             console.log(`\n--- ${categoryName} ---`);
//             if (categoryData.subtitle !== undefined) {
//                 console.log(categoryData.subtitle);
//             }
//             categoryData.options.forEach(item => console.log(item));
//         }
//     });
// }
// OPTIONSLIST.OPTIONS.NAME
// logStuff(dataThree);

// function logs everything twice and with dataThree there is an extra blank section