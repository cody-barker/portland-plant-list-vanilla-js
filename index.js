
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
        plantList.forEach(plant => {renderOnePlant(plant)})
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

//Add a submit event listener to the form
function formAdd() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let plantObj = {
            binomialName: e.target.binomialNameInput.value,
            commonName: e.target.commonNameInput.value,
            type: e.target.typeInput.value,
            height: e.target.heightInput.value,
            lightRequirement: e.target.heightInput.value,
            moistureRequirement: e.target.moistureRequirementInput.value
        }
        //console.log(plantObj)
        renderOnePlant(plantObj)
        addPlant(plantObj)
    })
}

formAdd();

function renderOnePlant(plantObj) {
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
    tdBinomialName.innerText = plantObj.binomialName
    tdCommonName.innerText = plantObj.commonName
    tdType.innerText = plantObj.type
    tdHeight.innerText = plantObj.height
    tdLightRequirement.innerText = plantObj.lightRequirement
    tdMoistureRequirement.innerText = plantObj.moistureRequirement
    //Add highlighting event listener
    addHighlightListener(newRow);
    //Append the new plant to table#mainList
    newRow.append(tdBinomialName, tdCommonName, tdType, tdHeight, tdLightRequirement, tdMoistureRequirement)
    document.querySelector('#mainList').append(newRow)
}

function addPlant(plantObj) {
    fetch('http://localhost:3000/plantList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantObj)
    })
        .then(resp => resp.json())
        .then(plant => console.log(plant))
    
}
