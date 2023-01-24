//POPULATE THE LIST IN THE DOM
// 1. On DOMcontentloaded, populate the main list
// 2. Do this by making a fetch request to the db
// 3. The final .then should iterate over each object in the db and create list items for each property
// 4. Each list item will then be appropriately appended to the table


//Potential Application features
//1. Sort columns alphanumerically by clicking on the column header
//2. Highlight plants when clicking anywhere on their row
//3. Filter the list based on clicked plants to create a custom list
//4. A form for adding new plants to the database
//5. Click on a plant img thumbnail to expand it

//Project Requirements
//3 Distinct Event Listener Types
//  x  1) DOMContentLoaded
//  x  2) Click - sort
//  x  3) Click - highlight row
//     4) Submit - form
//     5) Click - expand image




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
        //Add highlighting event listener
        addHighlightListener(newRow);
        //Append the new plant to table#mainList
        newRow.append(tdBinomialName, tdCommonName, tdType, tdHeight, tdLightRequirement, tdMoistureRequirement)
        document.querySelector('#mainList').append(newRow)
        })
    })
}

//SORT ALPHABETICALLY OR NUMERICALLY
//1. Assign event listeners to all TH tags
//src = https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript

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

//Clicking anywhere in a row highlights it
function addHighlightListener(newRow) {
    newRow.addEventListener('click', (e) => {
        e.target.parentNode.style.backgroundColor = (e.target.parentNode.style.backgroundColor === 'yellow' ) ? ('transparent'):('yellow');
    })
}

