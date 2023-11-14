document.addEventListener('DOMContentLoaded', () => {
    //event listeners
    //Categories
    document.getElementById('creatures').addEventListener('click', getCreatures)
    document.getElementById('equipment').addEventListener('click', getEquipment)
    document.getElementById('materials').addEventListener('click', getMaterials)
    document.getElementById('monsters').addEventListener('click', getMonsters)
    document.getElementById('treasures').addEventListener('click', getTreasures)

    //SearchBar
    let form = document.querySelector('#compendium-form')
    form.addEventListener('submit', handleSubmit)

    function handleSubmit(e) {
        e.preventDefault()
        let searchValue = {
            name: e.target.search.value
        }
        processInputString(searchValue)
        form.reset()
        // debugger
    }

    function processInputString(value) {
        fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
            }
        })
            .then(res => res.json())
            .then(searchName => {
                for (let key in searchName) {
                    searchName[key].name.forEach((e) => renderAll(e))
                }
            })
            debugger
            .catch(error => console.error(error))
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
        let div = document.getElementById('items')
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
