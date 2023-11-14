document.addEventListener('DOMContentLoaded', () => {

    const div = document.getElementById('items')
    let allNames = []

    
    //Categories
    document.getElementById('creatures').addEventListener('click', getCreatures)
    document.getElementById('equipment').addEventListener('click', getEquipment)
    document.getElementById('materials').addEventListener('click', getMaterials)
    document.getElementById('monsters').addEventListener('click', getMonsters)
    document.getElementById('treasures').addEventListener('click', getTreasures)

    //SearchBar
    let form = document.querySelector('#compendium-form')
    form.addEventListener('submit', handleSubmit)
    
    //submit event from Searchbar
    function handleSubmit(e) {
        div.innerHTML = ''
        e.preventDefault()
        let searchValue = {
            name: e.target.search.value.toLowerCase()
        }
        processInputString(searchValue)
        form.reset()
        // debugger
    }

    //fetch search form input string value
    //send to render function
    function processInputString(value) {
        console.log(value)
        fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${value.name}`)
            .then(res => res.json())
            .then(searchName => {
                for(let key in searchName){
                renderAll(searchName[key])
                }
            })
            .catch(error => console.error(error))
            debugger
            
    }

    //FETCH compendium API
    function getCompendium() {
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/all')
            .then(res => res.json())
            .then(allItems => {
                for (let key in allItems) {
                    allItems[key].forEach((e) => renderAll(e))
                }
            })
            .catch(error => console.error(error))
    }

    //renderAll
    function renderAll(item) {
        let card = document.createElement('card')
        let img = document.createElement('img')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        img.src = item.image
        h2.textContent = `Name: ${item.name}`
        p.textContent = `Category: ${item.category}`
        div.appendChild(card)
        card.append(img, h2, p)
    }

    //handle

    //FETCH
    function getCreatures() {
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    function getEquipment() {
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    function getMaterials() {
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/materials')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    function getMonsters() {
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    function getTreasures() {
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/treasure')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    //Initial Render
    //Get Data and render to DOM
    function initialize() {
        getCompendium()
    }
    initialize()
})
