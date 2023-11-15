document.addEventListener('DOMContentLoaded', () => {

    const div = document.getElementById('items')

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
        fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${value.name}`)
            .then(res => res.json())
            .then(searchName => {
                for (let key in searchName) {
                    renderAll(searchName[key])
                }
            })
            .catch(error => console.error(error))
    }

    //header image event listener
    //click header logo to refresh search
    let headerImage = document.getElementById('header-logo')
    headerImage.addEventListener('click', () =>{
        div.innerHTML = ''
        getCompendium()
    })

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

    //render items to DOM
    function renderAll(item) {
        let card = document.createElement('card')
        card.setAttribute('data-itemName', item.name)
        card.addEventListener('click', () => {
            const itemName = card.getAttribute('data-itemName')
            fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${itemName}`)
            .then(res => res.json())
            .then((clickedName) => {
                for (let key in clickedName) {
                    singleItemRender(clickedName[key])
                }
            })
            .catch(error => console.error(error))
            // console.log(itemName)
        })
        let img = document.createElement('img')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        img.src = item.image
        h2.textContent = `Name: ${item.name.toUpperCase()}`
        p.textContent = `Category: ${item.category}`
        div.appendChild(card)
        card.append(img, h2, p)

    }

    //Single Item Render when any card is clicked
    function singleItemRender(singleItem){
        div.innerHTML = ''
        console.log(singleItem)
        let p = document.createElement('p')
        let img = document.createElement('img')
        img.src = singleItem.image
        let pageCard = document.createElement('page-card')
        let h2 = document.createElement('h2')
        h2.textContent = `Name: ${singleItem.name.toUpperCase()}`
        let description = document.createElement('h3')
        description.textContent = `Description: ${singleItem.description}`
        let locations = document.createElement('h4')
        let br = document.createElement('br')
        br.innerHTML = `<br />`
        locations.textContent = `Common Location(s): ${singleItem.common_locations}`
        let drops = document.createElement('h5')
        drops.textContent = `Items Dropped: ${singleItem.drops}`
        let dlc = document.createElement('h6')
        dlc.textContent = `Dlc: ${singleItem.dlc}`
        div.appendChild(pageCard)
        pageCard.append(img, h2, description, locations, drops, dlc)
        // p.appendChild(img)
        // p.appendChild(h2)
        // p.appendChild(description)
        // p.appendChild(locations)
        // p.appendChild(drops)
        // p.appendChild(dlc)
        // pageCard.append(img, h2, description, br, locations, dlc)

    }

    //FETCH
    function getCreatures() {
        div.innerHTML = ''
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures')
            .then(res => res.json())
            .then(data => {
                for (let key in data) {
                    data[key].forEach((e) => renderAll(e))
                }
            })
            .catch(error => console.log(error))
    }

    function getEquipment() {
        div.innerHTML = ''
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment')
            .then(res => res.json())
            .then(data => {
                for (let key in data) {
                    data[key].forEach((e) => renderAll(e))
                }
            })
            .catch(error => console.log(error))
    }

    function getMaterials() {
        div.innerHTML = ''
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/materials')
            .then(res => res.json())
            .then(data => {
                for (let key in data) {
                    data[key].forEach((e) => renderAll(e))
                }
            })
            .catch(error => console.log(error))
    }

    function getMonsters() {
        div.innerHTML = ''
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
            .then(res => res.json())
            .then(data => {
                for (let key in data) {
                    data[key].forEach((e) => renderAll(e))
                }
            })
            .catch(error => console.log(error))
    }

    function getTreasures() {
        div.innerHTML = ''
        fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/treasure')
            .then(res => res.json())
            .then(data => {
                for (let key in data) {
                    data[key].forEach((e) => renderAll(e))
                }
            })
            .catch(error => console.log(error))
    }


    //Initial Render
    //Get Data and render to DOM
    function initialize() {
        getCompendium()
    }
    initialize()

})


// //EventListener to cards // THIS IS NOT THE PLACE FOR THIS
// let cards = document.querySelectorAll('card')
// cards.forEach((e) => e.addEventListener('click', () => console.log('click')))
