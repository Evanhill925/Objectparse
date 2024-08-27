function testNested(data){
    const optionLists = data.data.itemPage.optionLists;
    const nestedCategories = {};
    const mainCat =  optionLists[0].options[0].nestedExtrasList.map(option => option.name);
   
//     const nestedOptions = optionLists[0].options[0].nestedExtrasList.options[0].map(option => option.name);
//     nestedCategories[mainCat] = nestedOptions
    for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {
   
   console.log(optionLists[0].options[0].nestedExtrasList[0].options.map(option => option.name));
}

}
testNested(dataThree)

mainCat // returns [ 'Rice', 'Beans', 'Toppings', 'Extra or Half fillings' ]

for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {   
console.log(optionLists[0].options[0].nestedExtrasList[i].options.map(option => option.name)); // this returns below 
}
// [ 'White Rice', 'Brown Rice', 'No Rice' ]
// [ 'Black Beans', 'Pinto Beans', 'No Beans' ]
// [
//   'Guacamole',
//   'Fresh Tomato Salsa',
//   'Roasted Chili-Corn Salsa',
//   'Tomatillo-Green Chili Salsa',
//   'Tomatillo-Red Chili Salsa',
//   'Sour Cream',
//   'Fajita Veggies',
//   'Cheese',
//   'Romaine Lettuce',
//   'Queso Blanco'
// ]
// [
//   'Extra Chicken',
//   'Extra Steak',
//   'Extra Carnitas',
//   'Extra Beef Barbacoa',
//   'Extra Sofritas',
//   'Extra Chicken al Pastor',
//   'Half Steak',
//   'Half Sofritas',
//   'Half Carnitas',
//   'Half Beef Barbacoa',
//   'Half Chicken'
// ]

for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {
    if (optionLists[i].name.includes("Recommended") || optionLists[i].name.includes("DoubleDash")) {
        continue;
    }
console.log(optionLists[i].options.map(option => option.name))
}

// returns [
//   'Chicken al Pastor',
//   'Chicken',
//   'Steak',
//   'Beef Barbacoa',
//   'Carnitas',
//   'Sofritas',
//   'Veggie'
// ]


working nested 

function testNested(data){
    const categories={}
    const optionLists = data.data.itemPage.optionLists;
    // const nestedCategories = {};
    // const mainCat =  optionLists[0].options[0].nestedExtrasList.map(option => option.name);
    console.log(data.data.itemPage.itemHeader.name) // item name
    for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {
        if (optionLists[i].name.includes("Recommended") || optionLists[i].name.includes("DoubleDash")) {
            continue;
        }
   console.log(optionLists[i].options.map(option => option.name))
}
for(let i = 0; i < optionLists[0].options[0].nestedExtrasList.length; i++) {   
    console.log(optionLists[0].options[0].nestedExtrasList[i].options.map(option => option.name)); // this returns below 
    }
}
testNested(dataThree)


// returns

// Burrito Bowl
// [
//   'Chicken al Pastor',
//   'Chicken',
//   'Steak',
//   'Beef Barbacoa',
//   'Carnitas',
//   'Sofritas',
//   'Veggie'
// ]
// [ 'White Rice', 'Brown Rice', 'No Rice' ]
// [ 'Black Beans', 'Pinto Beans', 'No Beans' ]
// [
//   'Guacamole',
//   'Fresh Tomato Salsa',
//   'Roasted Chili-Corn Salsa',
//   'Tomatillo-Green Chili Salsa',
//   'Tomatillo-Red Chili Salsa',
//   'Sour Cream',
//   'Fajita Veggies',
//   'Cheese',
//   'Romaine Lettuce',
//   'Queso Blanco'
// ]
// [
//   'Extra Chicken',
//   'Extra Steak',
//   'Extra Carnitas',
//   'Extra Beef Barbacoa',
//   'Extra Sofritas',
//   'Extra Chicken al Pastor',
//   'Half Steak',
//   'Half Sofritas',
//   'Half Carnitas',
//   'Half Beef Barbacoa',
//   'Half Chicken'
// ]