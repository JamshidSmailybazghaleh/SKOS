/* ==========================================================
   SKOS Mission Control
   Live Build Center
   BUILD-000235
   Version 1.0
========================================================== */

const latestBuildElement = document.getElementById("latestBuild");
const buildCountElement = document.getElementById("buildCount");
const activeBuildsElement = document.getElementById("activeBuilds");
const completedBuildsElement = document.getElementById("completedBuilds");

const tableBody =
document.querySelector("#buildTable tbody");

const searchBox =
document.getElementById("searchBox");

let builds = [];

async function loadBuilds(){

    try{

        const response =
        await fetch("../data/BUILDS.json");

        builds = await response.json();

        renderDashboard(builds);

        renderTable(builds);

    }

    catch(error){

        console.error(error);

        tableBody.innerHTML = `
        <tr>
        <td colspan="6">
        Unable to load BUILDS.json
        </td>
        </tr>
        `;

    }

}

function renderDashboard(data){

    buildCountElement.textContent =
    data.length;

    latestBuildElement.textContent =
    data[0].buildId;

    const active =
    data.filter(
    build=>build.status==="ACTIVE"
    ).length;

    const completed =
    data.filter(
    build=>build.status==="COMPLETED"
    ).length;

    activeBuildsElement.textContent =
    active;

    completedBuildsElement.textContent =
    completed;

}

function renderTable(data){

    tableBody.innerHTML="";

    data.forEach(build=>{

        const row =
        document.createElement("tr");

        row.innerHTML=`

        <td>${build.buildId}</td>

        <td>${build.title}</td>

        <td class="status-${build.status.toLowerCase()}">

        ${build.status}

        </td>

        <td>${build.engine}</td>

        <td>${build.version}</td>

        <td>${build.date}</td>

        `;

        tableBody.appendChild(row);

    });

}

searchBox.addEventListener(

"keyup",

function(){

const keyword =
this.value.toLowerCase();

const filtered =
builds.filter(build=>{

return(

build.buildId.toLowerCase().includes(keyword)

||

build.title.toLowerCase().includes(keyword)

);

});

renderTable(filtered);

}

);

loadBuilds();
