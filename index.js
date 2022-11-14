//FETCH
//******** Get slides info ********

//Slide one
const infoOne = document.getElementById('slideTextOne');
fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/436535')

  .then(response => response.json())
  .then((data) => {

      infoOne.innerHTML += `
        <div id="slideOne" alt="${data.title} by ${data.artistDisplayName}"></div>
          <div class="textSlide">
            <a href="${data.objectURL}" target="_blank">
            <p class="titleSlide">${data.title}</p>
            <p>${data.objectDate}, ${data.artistDisplayName}</p>
            </a>
          </div>
      `
  })

//Slide two
const infoTwo = document.getElementById('slideTextTwo');
fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/12019')

  .then(response => response.json())
  .then((data) => {

    infoTwo.innerHTML += `
        <div id="slideTwo" alt="${data.title} by ${data.artistDisplayName}"></div>
          <div class="textSlide">
            <a href="${data.objectURL}" target="_blank">
            <p class="titleSlide">${data.title}</p>
            <p>${data.objectEndDate}, ${data.artistDisplayName}</p>
            </a>
          </div>
      `
  })

//Slide Three
const infoThree = document.getElementById('slideTextThree');
fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/10154')

  .then(response => response.json())
  .then((data) => {

    infoThree.innerHTML += `
        <div id="slideThree" alt="${data.title} by ${data.artistDisplayName}"></div>
          <div class="textSlide">
            <a href="${data.objectURL}" target="_blank">
            <p class="titleSlide">${data.title}</p>
            <p>${data.objectDate}, ${data.artistDisplayName}</p>
            </a>
          </div>
      `
  })

//Slide Four
const infoFour = document.getElementById('slideTextFour');
fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/17139')

  .then(response => response.json())
  .then((data) => {

    infoFour.innerHTML += `
        <div id="slideFour" alt="${data.title} by ${data.artistDisplayName}"></div>
          <div class="textSlide">
            <a href="${data.objectURL}" target="_blank">
            <p class="titleSlide">${data.title}</p>
            <p>${data.objectDate}, ${data.artistDisplayName}</p>
            </a>
          </div>
      `
  })

//******** Get Met Departments ********
const results = document.getElementById('depContainer');
fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')

  .then(response => response.json())
  .then((data) => {
  data.departments.forEach(met => {

    results.innerHTML += `
    <div class="card card--effect-1">
    <a href="https://www.metmuseum.org/art/collection/search?showOnly=openAccess&department=${met.departmentId}">
      <div id="${met.departmentId}">
        <div class="thumb" style="background-image: url(img/depThumb${met.departmentId}.jpg);">
        <div class="textOverlay">
        <h3>${met.displayName}</h3>
        </div>
        </div>
      </div>
    </a>
    </div>
      `

    })
  })
  .catch((error) => {
    console.log(error)
});

//******** Chart ********


/*fetch('https://avancera.app/cities/')
  .then((response) => response.json())
  .then((result) => {

    for (??) {
      const city = result[??]

      data.push(city ??)  -- total obects
      labels.push(met.displayName)  -- dep name
    }*/



/*    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
.then((response) => response.json())
  .then((result) => {
    result.departments.forEach( met => {

      let depName = met.displayName
      labels.push(depName)
    })
})*/

let depNames = [];

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: depNames,
        datasets: [{
          label: 'Total number of publicly-available objects for each collection area',
          data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 100, 100, 12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


async function fetchData() {
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/departments';
  const response = await fetch(url);
  const datapoints = await response.json();
  return datapoints;
}

fetchData().then(datapoints => {
  const depNames = datapoints.departments.map(
    function(index){
      return index.displayName;
    })
  console.log(depNames)

  return depNames;
})
