
//Potential Application features
// x 1. Sort columns alphanumerically by clicking on the column header
// x 2. Highlight plants when clicking anywhere on their row
//   3. Filter the list based on clicked plants to create a custom list
// x 4. A form for adding new plants to the database
//   5. Click on a plant img thumbnail to expand it
//   6. Filter the list based on clicked plants to create a custom list

//Project Requirements
// x  3 Distinct Event Listener Types 
// x    1) Click - highlight row, sort columns alphanumerically
// x    2) DOMContentLoaded - render plants to the list, add the submission form, add the column sorting feature
// x    3) Submit - form
//      4) Click - expand image
//
// x  Must return at least 5 objects from the server with >=3 attributes per object
// x  Request/Response cycle should be async, using JSON
// x  Entire app must run on a single page
// x  No redirects or reloads
// x  Must implement at least one instance of array iteration (see plantList.forEach in fn initList())

//Stretch goals
// x  Use json-server in your project to persist your app's interactivity

//After the html loads, populate the full Plant List
document.addEventListener("DOMContentLoaded", initList)
document.addEventListener("DOMContentLoaded", formAdd)
document.addEventListener("DOMContentLoaded", columnSort)

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
function columnSort() {
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
}

//Clicking anywhere in a row highlights it
function addHighlightListener(newRow) {
    newRow.addEventListener('click', (e) => {
        e.target.parentNode.style.backgroundColor = (e.target.parentNode.style.backgroundColor === 'rgb(4, 170, 109)' ) ? ('transparent'):('rgb(4, 170, 109)');
        console.log(e.target.parentNode.style.backgroundColor)
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
            lightRequirement: e.target.lightRequirementInput.value,
            moistureRequirement: e.target.moistureRequirementInput.value
        }
        //console.log(plantObj)
        addPlant(plantObj)
    })
}

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
    tdBinomialName.style.fontStyle = "italic"
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

//Persist the form submission to the database and render it to the DOM
function addPlant(plantObj) {
    fetch('http://localhost:3000/plantList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantObj)
    })
        .then(resp => resp.json())
        .then(() => renderOnePlant(plantObj))
}

