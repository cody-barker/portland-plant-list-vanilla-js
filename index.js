//LIST ITEM TEMPLATE FOR DB.JSON
// Comments aren't allowed in db.json files
// {            
//     "id": ,
//     "binomialName": "",
//     "commonName": "",
//     "type": "",
//     "height": ,
//     "lightRequirement": "",
//     "moisutreRequirement": [""]
// }


//PLANNING
// 1. On DOMcontentloaded, populate the main list
// 2. Do this by making a fetch request to the db
// 3. The final .then should iterate over each object in the db and create list items for each property
// 4. Each list item will then be appropriately appended to the table



//After the html loads, populate the main list
document.addEventListener("DOMContentLoaded", initList)

function initList() {
    fetch('http://localhost:3000/plantList')
    .then(resp => resp.json())
    .then(plantList => {
        plantList.forEach(plant => {
        //Create a new row in the table for each plant
        const newRow = document.createElement('tr')
        //Create all the data cells for that plant in the table
        const tdBinomialName = document.createElement('td')
        const tdCommonName = document.createElement('td')
        const tdType = document.createElement('td')
        const tdHeight = document.createElement('td')
        const tdLightRequirement = document.createElement('td')
        const tdMoistureRequirement = document.createElement('td')
        //Assign the data cells their corresponding property values
        tdBinomialName.innerText = plant.binomialName
        tdCommonName.innerText = plant.commonName
        tdType.innerText = plant.type
        tdHeight.innerText = plant.height
        tdLightRequirement.innerText = plant.lightRequirement
        tdMoistureRequirement.innerText = plant.moistureRequirement
        //Append the new plant to the mainList table
        newRow.append(tdBinomialName, tdCommonName, tdType, tdHeight, tdLightRequirement, tdMoistureRequirement)
        document.querySelector('#mainList').append(newRow)
        })
    })
}