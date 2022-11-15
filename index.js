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

let yLabels = []; //Department name
let labelIds = [];  //Department IDs
let totalCollect = []; //19 values

chartIt()

async function chartIt() {
  await fetchData()
  await fetchTotals()

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: yLabels,
      datasets: [{
        label: 'Total number of publicly- available objects for each collection area',
        data: totalCollect,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
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
}

//FETCH LABELS
async function fetchData() {
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/departments';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

fetchData().then(data => {
  data.departments.forEach(met => {
    let depName = met.displayName;
    yLabels.push(depName);
    let depId = met.departmentId;
    labelIds.push(depId);
  })
  console.log(yLabels)
  console.log(labelIds)
})

//FETCH TOTALS
async function fetchTotals() {

  for (i = 0; i < labelIds.length; i++) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=" + labelIds[i];
    await fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      totalCollect.push(data.total);
      console.log(totalCollect)
    })
  console.log(totalCollect)
  }
}
