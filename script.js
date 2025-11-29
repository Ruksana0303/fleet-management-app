let feetData=[];
document.getElementById("addFleet").addEventListener("click",addVehicle);
document.getElementById("FilterCategory").addEventListener("change",applyFilters);
document.getElementById("filterAvailability").addEventLisitner("change",applyFilters);
document.getElementById("clearFilter").addEventListener("click",clearFilters);

function addVehicle(){
    let regNo=document.getElementById("regNo").value.trim();
    let category=document.getElementById("catergory").value;
    let driverName=document.getElementById("driverName").value.trim();
    let availability=document.getElementById("Availability").value;
    if (!regNo || !category || !driverName){
        alert("All fields are required");
        return;
    }
    flexData.push({
        id:Date.now(),
        regNo,
        category,
        driverName,
        availability
    });
    clearForm();
    renderFleet();
}

function clearForm() {
        document.getElementById("regNo").value="";
        document.getElementById("catergory").value="";
        document.getElementById("driverName").value="";
        document.getElementById("availability").value="Available";
}
function renderFleet(filterList=fleetData){
        const container=document.getElementById("fleetContainer");
        container.innerHTML="";
        filteredList.forEach(vehicle=>{
            let card=document.createElement("div");
            card.className="card";
            card.innerHTML=`
                <img src="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
                <h3>${vehicle.regNo}</h3>
                <p>Catergory:${vehicle.category}</p>
                <p>Driver: ${vehicle.driverName}</p>
                <p>Status: ${vehicle.availability}</p>
                <button onclick="updateDriver(${vehicle.id})">Udate Driver</button>
                <button onclick="toggleAvailability(${vehicle.id})">Change Availability</button>
                <button onclick="deleteVehichle(${vehicle.id})">Delete Vehicle</button>
                `;
                   
            container.append(card);
       });

}
function updateDriver(id){
    let newName=prompt("Enter new driver name:");

    if(!newName || newName.trim()===""){
        alert("Driver name cannot be empty");
        return;
    }
    fleetData=fleetData.map(v=>
        v.id===id?{...v,driverName: newName}:v
    );
    renderFleet();
}
function toggleAvailability(id){
    fleetData=fleetData.map(v =>
        v.id===id
        ? {...v,availability: v.availability==="available"?"unavailable": "Available"}
        :v
    );
    renderFleet();
}
function applyFilters(){
    let catergory=document.getElementById("filterCatergory").value;
    let availability=document.getElementById("filterAvailability").value;

    let filtered=fleetData.filter(v=>{
        let catergoryMatch=(catergory==="ALL" || v.category===catergory);
        let availabilityMatch=(availability === "ALL" || v.availability === availability);
        return catergoryMatch && availabilityMatch;

    });
    renderFleet(filtered);
    
}
function clearFilter(){
    document.getElementById("filterCategory").value="ALL";
    document.getElementById("filterAvailability").value="ALL";
    renderFleet();
}

