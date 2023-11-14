document.addEventListener('DOMContentLoaded', () => {
    //event listeners
    //Categories
    document.getElementById('creatures').addEventListener('click', getCreatures)
    document.getElementById('equipment').addEventListener('click', getEquipment)
    document.getElementById('materials').addEventListener('click', getMaterials)
    document.getElementById('monsters').addEventListener('click', getMonsters)
    document.getElementById('treasures').addEventListener('click', getTreasures)

    //SearchBar
    let search = document.getElementById('search')
    search.addEventListener('input', (e) => {
        let searchValue = e.target.value
        processInputString(searchValue)
    })

    //findItem via Search
    function processInputString(event){
        console.log(event)
    }

    //FETCH compendium API
    function getCompendium(){
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/all')
        .then(res => res.json())
        .then(allItems => {
            for(let key in allItems){
                allItems[key].forEach((e) => renderAll(e))
            }   
        })
        .catch(error => console.error(error))
        debugger
    }
    
    //renderAll
    function renderAll(item){
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
    function getCreatures(){
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    function getEquipment(){
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    function getMaterials(){
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/materials')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    function getMonsters(){
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    function getTreasures(){
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/treasure')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    //Initial Render
    //Get Data and render to DOM
    function initialize(){
        getCompendium()
    }
    initialize()
})
