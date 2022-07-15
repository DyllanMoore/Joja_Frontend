// Button Consts
const accessButton = document.getElementById("access-button");
const addEmployeeButton = document.getElementById("add-employee-button");
const deleteEmployeeButton = document.getElementById("delete-employee-button");
const updateChoicesButton = document.getElementById("update-choices-button");
const updateNameButton = document.getElementById("update-name-button");
const updateTitleButton = document.getElementById("update-title-button");
const updateSalaryButton = document.getElementById("update-salary-button");
const headerRefresh = document.getElementById("header-refresh");

// Div Hidden Containers Consts
const databaseChoicesContainer = document.getElementById("database-choices-container");
const allEmployeesContainer = document.getElementById("all-employees-container");
const addNewEmployeeContainer = document.getElementById("add-new-employee-container");
const deleteEmployeeContainer = document.getElementById("remove-employee-container");
const updateEmployeeFormContainer = document.getElementById("update-employee-container");
const updateEmployeeName = document.getElementById("update-employee-name-container");
const updateEmployeeTitle = document.getElementById("update-employee-title-container");
const updateEmployeeSalary = document.getElementById("update-employee-salary-container");

// Refresh Page (home)
headerRefresh.addEventListener("click", function() {
    window.location.reload();
})

// Container Toggles
const choiceFormValue = document.getElementById("choice-form");
const updateFormValue = document.getElementById("update-list");
const makeSelectionMainDiv = document.getElementById("make-selection-main-div");
const makeSelectionRemoveDiv = document.getElementById("make-selection-remove-div");
const makeSelectionUpdateDiv = document.getElementById("make-selection-update-div");


accessButton.addEventListener("click", function(){
    if(choiceFormValue.value === "access-records") {
        allEmployeesContainer.style.display = "block";
        databaseChoicesContainer.style.display = "none";
    } else if(choiceFormValue.value === "add-employee") {
        addNewEmployeeContainer.style.display = "block";
        databaseChoicesContainer.style.display = "none";
    } else if(choiceFormValue.value === "delete-employee") {
        deleteEmployeeContainer.style.display = "block";
        databaseChoicesContainer.style.display = "none";
    } else if(choiceFormValue.value === "update-employee") {
        updateEmployeeFormContainer.style.display = "block";
        databaseChoicesContainer.style.display = "none";
    } else {
        const makeSelectionMain = document.createElement("make-selection-main").innerHTML = "Make a Selection."
        makeSelectionMainDiv.append(makeSelectionMain);
    }
});

updateChoicesButton.addEventListener("click", function() {
    if(updateFormValue.value === "name") {
        updateEmployeeName.style.display = "block";
        updateEmployeeFormContainer.style.display = "none";
    } else if(updateFormValue.value === "title") {
        updateEmployeeTitle.style.display = "block";
        updateEmployeeFormContainer.style.display = "none";
    } else if(updateFormValue.value === "salary") {
        updateEmployeeSalary.style.display = "block";
        updateEmployeeFormContainer.style.display = "none";
    } else {
        const makeSelectionUpdate = document.createElement("make-selection-update").innerHTML = "Make a Selection."
        makeSelectionUpdateDiv.append(makeSelectionUpdate);
    }
});

//Display All Employees
fetch("http://localhost:3000/employees")
.then (response => response.json())
.then((data) => {
    displayAllEmployees(data);
});

function displayAllEmployees(data) {
    for (let i = 0; i < data.length; i++){
        const employeeInfo = document.getElementById("employee-info");
        const employeeInfoDiv = document.createElement('div');
        employeeInfoDiv.setAttribute("class", "block small-text margin-medium");

        const employeeId = document.createElement("employee-id").innerHTML = `ID: ${data[i].employee_id}`;
        const employeeName = document.createElement("employee-name").innerHTML = `Name: ${data[i].employee}`;

        const employeeRoleNumber = data[i].employee_role_fk;
        if(employeeRoleNumber === 1) {
            employeeRole = document.createElement("employee-title").innerHTML = `Title: Manager`;
        } else if(employeeRoleNumber === 2) {
            employeeRole = document.createElement("employee-title").innerHTML = `Title: Stocker`;
        } else if(employeeRoleNumber === 3) {
            employeeRole = document.createElement("employee-title").innerHTML = `Title: Cashier`;
        } else if(employeeRoleNumber === 4) {
            employeeRole = document.createElement("employee-title").innerHTML = `Title: Janitor`;
        } else {
            employeeRole = document.createElement("employee-title").innerHTML = `Title: Null`;
        }        
        const employeeSalary = document.createElement("employee-salary").innerHTML = `Salary: ${data[i].employee_salary}`;
       
        employeeInfoDiv.innerHTML =`${employeeId} &#8226 ${employeeName} &#8226 ${employeeRole} &#8226 ${employeeSalary}`;
        employeeInfo.append(employeeInfoDiv);
    }
}

//Add New Employee
addEmployeeButton.addEventListener("click", function(){
    const newEmployeeAddedDiv = document.getElementById("new-employee-added-container");

    fetch("http://localhost:3000/employees/" + document.getElementById("new-employee-name").value, {
    method: 'POST',
    body: JSON.stringify({
        "employee": document.getElementById("new-employee-name").value, 
        "employee_role_fk": document.getElementById("title-list").value, 
        "salary": document.getElementById("employee-salary").value}),
    })
    .then(function(response) {
        if (response.status === 202) {
            const newEmployeeAdded = document.createElement("employee-added").innerHTML = 
            `${document.getElementById("new-employee-name").value} was added to the JojaMart Employee Management System.`;
            newEmployeeAddedDiv.append(newEmployeeAdded);
        } else {
            console.log("Big sad");
        }
    });
});


//Delete Employee
deleteEmployeeButton.addEventListener("click", function(){
    const deletedEmployeeDiv = document.getElementById("deleted-employee-container");

    fetch("http://localhost:3000/employees/" + document.getElementById("employee-to-delete").value, {
    method: 'DELETE'
    })
    .then(function(response) {
        if (response.status === 202) {
            const employeeDeleted = document.createElement("employee-deleted").innerHTML = 
            `${document.getElementById("employee-to-delete").value} was deleted from the JojaMart Employee Management System.`;
            deletedEmployeeDiv.append(employeeDeleted);
        } else {
            console.log("Big sad");
        }
    });
});

// Update Employee Name
updateNameButton.addEventListener("click", function(){
    const nameUpdatedDiv = document.getElementById("name-updated-container");
    const newName = document.getElementById("new-name").value;

    fetch("http://localhost:3000/employees/" + document.getElementById("old-name").value, {
    method: 'PUT',
    body: newName
    })
    .then(function(response) {
        if (response.status === 202) {
            const nameUpdated = document.createElement("name-updated").innerHTML = 
            `${document.getElementById("old-name").value}'s name was changed to $ ${document.createElement("new-name").innerHTML.value}.`;
            nameUpdatedDiv.append(nameUpdated);
        } else {
            console.log("Big sad");
        }
    });
});

// Update Employee Title
updateTitleButton.addEventListener("click", function(){
    const titleUpdatedDiv = document.getElementById("title-updated-container");
    const newTitle = document.getElementById("new-title").value;
    let title;
    let value;
    if(newTitle === "1") {
        title = "Manager";
        value = 1;
    } else if(newTitle === "2") {
        title = "Stocker";
        value =2;
    } else if(newTitle === "3") {
        title = "Cashier";
        value = 3;
    } else if(newTitle === "4") {
        title = "Janitor";
        value = 4;
    } else {
        title = "How did you get to this?";
        value = 999;
    }

    fetch("http://localhost:3000/title/" + document.getElementById("employee-name-title").value, {
    method: 'PUT',
    body: value
    })
    .then(function(response) {
        if (response.status === 202) {
            const titleUpdated = document.createElement("title-updated").innerHTML = 
            `${document.getElementById("employee-name-title").value}'s title was changed to ${title}.`;
            titleUpdatedDiv.append(titleUpdated);
        } else {
            console.log("Big sad");
        }
    });
});

// Update Employee Salary
updateSalaryButton.addEventListener("click", function(){
    const salaryUpdatedDiv = document.getElementById("salary-updated-container");
    const newSalary = document.getElementById("new-salary").value;

    fetch("http://localhost:3000/salary/" + document.getElementById("employee-name-salary").value, {
    method: 'PUT',
    body: newSalary
    })
    .then(function(response) {
        if (response.status === 202) {
            const salaryUpdated = document.createElement("salary-updated").innerHTML = 
            `${document.getElementById("employee-name-salary").value}'s salary was changed to $${newSalary}.`;
            salaryUpdatedDiv.append(salaryUpdated);
        } else {
            console.log("Big sad");
        }
    });
});