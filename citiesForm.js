const url = 'https://avancera.app/cities/'

//GET city list
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        let tableData = ''
        data.map((values) => {
            tableData += `
            <tr>
            <td class="textId">${values.id}</td>
            <td>${values.name}</td>
            <td>${values.population}</td>
            </tr>`
        })
        document.getElementById('tableBody').innerHTML = tableData
    })
    .catch((error) => {
        console.log(error)
    })

//GET ID list to
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        let selectData = ''
        data.map((values) => {
            selectData += `<option value="${values.id}">${values.id} (${values.name}) </option>`
        })
        document.getElementById('idCityList').innerHTML = selectData
    })
    .catch((error) => {
        console.log(error)
    })

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        let selectData = ''
        data.map((values) => {
            selectData += `<option value="${values.id}">${values.id} (${values.name}) </option>`
        })
        document.getElementById('idCityListDel').innerHTML = selectData
    })
    .catch((error) => {
        console.log(error)
    })

//POST new city
const formPost = document.getElementById('formPost')

formPost.addEventListener('submit', formSubmit)

function formSubmit(e) {
    e.preventDefault()

    const cityName = document.getElementById('namePost').value
    const cityPopu = document.getElementById('populationPost').value

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: cityName, population: Number(cityPopu) })
    })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
}

//PUT city
const formPut = document.getElementById('formPut')

formPut.addEventListener('submit', formSubmitPut)

function formSubmitPut(e) {
    e.preventDefault()

    const cityName = document.getElementById('namePut').value
    const cityPopu = document.getElementById('populationPut').value

    const idPut = document.getElementById('idCityList').value

    fetch(url + idPut, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idPut,
            name: cityName,
            population: Number(cityPopu)
        })
    })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
}

//DELETE CITY
const formDel = document.getElementById('formDel')

formDel.addEventListener('submit', formSubmitDel)

function formSubmitDel(e) {
    e.preventDefault()

    let idDel = document.getElementById('idCityListDel').value

    fetch(url + idDel, {
        method: 'DELETE'
    })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
}

//Kod validerat
