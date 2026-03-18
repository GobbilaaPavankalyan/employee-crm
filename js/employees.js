let employees = [
{ id:101,name:"Pavankalyan",department:"Sales",role:"Manager",clients:["Client A","Client B"],active:true },
{ id:102,name:"MS dhoni",department:"Marketing",role:"Executive",clients:["Client X"],active:true },
{ id:103,name:"Shannu",department:"IT",role:"Developer",clients:["Client M","Client N"],active:false },
{ id:104,name:"Kajal",department:"HR",role:"HR Manager",clients:["Client HR1"],active:true }
];

// =========================
// LOAD EMPLOYEES
// =========================
async function loadEmployees(){

document.getElementById("employeeTable").innerHTML =
"<tr><td colspan='8'>⏳ Loading...</td></tr>";

await new Promise(res => setTimeout(res, 300));

let table="";

employees.forEach((emp,index)=>{

    table+=`
    <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>${emp.clients.join(", ")}</td>

        <td>
            <span class="badge ${emp.active ? 'bg-success':'bg-danger'}">
            ${emp.active ? 'Active':'Inactive'}
            </span>
        </td>

        <td>
            <button class="btn btn-toggle btn-sm"
            onclick="toggleStatus(${index})">
            Toggle
            </button>
        </td>

        <td>
            <button class="btn btn-info btn-sm"
            onclick="viewDetails(${index})"
            data-bs-toggle="modal"
            data-bs-target="#employeeModal">
            View
            </button>
        </td>
    </tr>
    `;
});

document.getElementById("employeeTable").innerHTML = table;
}

// =========================
// TOGGLE STATUS
// =========================
function toggleStatus(index){

employees[index].active = !employees[index].active;

// ✅ save full data
localStorage.setItem("employeesData", JSON.stringify(employees));

loadEmployees();
}

// =========================
// VIEW DETAILS + SAVE FOR PROFILE
// =========================
function viewDetails(index){

let emp = employees[index];

// ✅ Save for Profile page
localStorage.setItem("selectedEmployee", JSON.stringify(emp));

// show modal
let clientsList = emp.clients.map(c => `<li>${c}</li>`).join("");

document.getElementById("modalBody").innerHTML = `
    <p><strong>Name:</strong> ${emp.name}</p>
    <p><strong>Department:</strong> ${emp.department}</p>
    <p><strong>Role:</strong> ${emp.role}</p>
    <p><strong>Status:</strong> ${emp.active ? "Active" : "Inactive"}</p>

    <p><strong>Clients:</strong></p>
    <ol>${clientsList}</ol>
`;
}

// =========================
// INITIAL LOAD
// =========================
window.onload = function(){

let stored = localStorage.getItem("employeesData");

if(stored){
    employees = JSON.parse(stored); // ✅ FULL restore
}else{
    localStorage.setItem("employeesData", JSON.stringify(employees));
}

loadEmployees();

};