//POPULATE THE LIST IN THE DOM
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
        //Append the new plant to table#mainList
        newRow.append(tdBinomialName, tdCommonName, tdType, tdHeight, tdLightRequirement, tdMoistureRequirement)
        document.querySelector('#mainList').append(newRow)
        })
    })
}


//SORT ALPHABETICALLY OR NUMERICALLY
//1. Assign event listeners to all TH tags

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));