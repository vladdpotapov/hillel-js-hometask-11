'use strict';

function insertUserDataToRow() {
    for (let i = 0; i < users.length; i++) {
        let row = document.createElement('tr');
        row.classList.add('table__row');
        table.append(row);

        let cellId = document.createElement('td');
        cellId.classList.add('table__cell');
        row.append(cellId);

        cellId.innerText = users[i].id;

        let cellName = document.createElement('td');
        cellName.classList.add('table__cell');
        row.append(cellName);

        cellName.innerText = users[i].name;

        let cellActions = document.createElement('td');
        cellActions.classList.add('table__cell');
        row.append(cellActions);

        let tableButtonView   = createRowActionButton('View');
        tableButtonView.addEventListener('click', () => showUserInfoCard(i));

        let tableButtonEdit   = createRowActionButton('Edit');
        tableButtonEdit.addEventListener('click', () => showUserEditCard(i));

        let tableButtonDelete = createRowActionButton('Delete');
        tableButtonDelete.addEventListener('click', () => confirmRemoveUserObject(i));


        tableButtonAdd.addEventListener('click', () => showAddNewUserCard(i));

        cellActions.append(tableButtonView);
        cellActions.append(tableButtonEdit);
        cellActions.append(tableButtonDelete);
    }
}

function createRowActionButton(value) {
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', value);
    button.classList.add('table__button');
    return button;
}

function showUserInfoCard(i) {
    infoWindow.innerHTML = '';

    let userInfoTable = document.createElement('table');
    userInfoTable.classList.add('table');
    infoWindow.append(userInfoTable);

    let userInfoCell;
    let userInfoRow;
    for (let key in users[i]) {
        userInfoRow = document.createElement('tr');
        userInfoRow.classList.add('table__row');
        userInfoTable.append(userInfoRow);
    
        userInfoCell = document.createElement('td'); 
        userInfoCell.classList.add('table__cell');
        userInfoCell.innerHTML = `${key}: ${users[i][key]}`;
        userInfoRow.append(userInfoCell);
    }

    const userInfoCloseButton = createInfoWindowButtons('Close', userInfoTable);
    userInfoCloseButton.addEventListener('click', () => closeWindow(userInfoTable));
}

function createInfoWindowButtons(buttonValue, parent) {
    let buttonName = document.createElement('input');
    buttonName.setAttribute('type', 'button');
    buttonName.setAttribute('value', buttonValue);
    buttonName.classList.add('table__button');
    parent.append(buttonName);
    return buttonName;
}

function showUserEditCard(i) {
    infoWindow.innerHTML = '';

    let userInfoTable = document.createElement('table');
    userInfoTable.classList.add('table');
    infoWindow.append(userInfoTable);

    let userInfoCell;
    let userInfoRow;
    let userEditInput;
    let inputClassIdentifier = 1;
    for (let key in users[i]) {
        userInfoRow = document.createElement('tr');
        userInfoRow.classList.add('table__row');
        userInfoTable.append(userInfoRow);
    
        userInfoCell = document.createElement('td'); 
        userInfoCell.classList.add('table__cell');
        userInfoCell.innerHTML = `${key}: `;
        userInfoRow.append(userInfoCell);

        userEditInput = document.createElement('input');
        userEditInput.setAttribute('value', users[i][key]);
        userEditInput.classList.add('edit__inputs');
        userEditInput.classList.add('inputs' + inputClassIdentifier);
        userInfoTable.append(userEditInput);
        inputClassIdentifier++;
    }

    const userInfoCloseButton = createInfoWindowButtons('Close', userInfoTable);
    userInfoCloseButton.addEventListener('click', () => closeWindow(userInfoTable));

    const userInfoSaveButton = createInfoWindowButtons('Save', userInfoTable);
    userInfoSaveButton.addEventListener('click', function() {
        let userInputs = document.querySelectorAll('.edit__inputs');
        let array       = Object.values(users[i]);

        for (let i = 0; i < userInputs.length; i++) {
            if (array[i] !== userInputs[i].value) {
                array[i] = userInputs[i].value;
            } 
        }

        const objectKeys = {id: null, name: null, age: null, job: null, number: null, card: null};
        Object.keys(objectKeys).forEach(function(key, index){
            objectKeys[key] = array[index];
        });

        users.splice([i], 1, objectKeys);

        const valid = validateInputs();             // !
        if (valid) {                                // !
            saveDataToLocalStorage();
            updateMainTable();
        }
    });
}

function showAddNewUserCard(i) {
        infoWindow.innerHTML = '';

        let userInfoTable = document.createElement('table');
        userInfoTable.classList.add('table');
        userInfoTable.classList.add('table-newUser');
        userInfoTable.innerHTML = 'ADD NEW USER';
        infoWindow.append(userInfoTable);

        let userInfoCell;
        let userInfoRow;
        let userEditInput;
        let inputClassIdentifier = 1;

        for (let key in fakeObject) {                   
            userInfoRow = document.createElement('tr');
            userInfoRow.classList.add('table__row');
            userInfoTable.append(userInfoRow);
        
            userInfoCell = document.createElement('td'); 
            userInfoCell.classList.add('table__cell');
            userInfoCell.innerHTML = `${key}:<br>`;
            userInfoRow.append(userInfoCell);
    
            userEditInput = document.createElement('input');
            userEditInput.setAttribute('value', '');
            userEditInput.classList.add('edit__inputs');
            userEditInput.classList.add('inputs' + inputClassIdentifier);
            userInfoTable.append(userEditInput);
            inputClassIdentifier++;
        }

        const userInfoCloseButton = createInfoWindowButtons('Close', userInfoTable);
        userInfoCloseButton.addEventListener('click', () => closeWindow(userInfoTable));

        const userInfoSaveButton = createInfoWindowButtons('Save', userInfoTable);
        userInfoSaveButton.addEventListener('click', function() {
            let userInputs = document.querySelectorAll('.edit__inputs');
            let array       = Object.values(fakeObject);                    
    
            for (let i = 0; i < userInputs.length; i++) {
                if (array[i] !== userInputs[i].value) {
                    array[i] = userInputs[i].value;
                } 
            }
 
            const objectKeys = {id: null, name: null, age: null, job: null, number: null, card: null};
            Object.keys(objectKeys).forEach(function(key, index){
                objectKeys[key] = array[index];
            });

            const valid = validateInputs();             
            if (valid) {  
                users.push(objectKeys);                              
                saveDataToLocalStorage();               
                updateMainTable();                      
            }
        });
}

function closeWindow(itemToRemove) {
    itemToRemove.remove();
}

function saveDataToLocalStorage() {
    const stringifiedArray = users.map(function(item) {     
        return JSON.stringify(item)                         
    });
    const stringArray = stringifiedArray.join(';');         
    localStorage.setItem('Users', stringArray);             
}

function getDataFromLocalStorage() {                        
    if (!localStorage.getItem('Users')) {                   
        users = defaultUsers;                               
        return;                                             
    }
    
    let parsedUsersArray = localStorage.getItem('Users').split(';');  
    const usersArray = parsedUsersArray.map(item => JSON.parse(item)) 
    if (!usersArray) {                                                
        users =  defaultUsers;                                        
        return;                                                       
    }
    users =  usersArray;                                              
}

function createMainTableHeadings(elementToCreate, elementClass, elementInnerText) {
    let element = document.createElement(elementToCreate);
    element.classList.add(elementClass);
    element.innerHTML = elementInnerText;
    return element;
}

function updateMainTable() {
    table.innerHTML = '';

    let headingRow = document.createElement('tr');
    headingRow.classList.add('table__row');
    table.append(headingRow);
    
    let headingCellId = createMainTableHeadings('th', 'table__heading-cell', 'ID');
    headingRow.append(headingCellId);

    let headingCellName = createMainTableHeadings('th', 'table__heading-cell', 'NAME');
    headingRow.append(headingCellName);

    let headingCellActinos = createMainTableHeadings('th', 'table__heading-cell', 'ACTIONS');
    headingRow.append(headingCellActinos);

    insertUserDataToRow();
}

function removeUserObject(i) {
    infoWindow.innerHTML = '';

    users.splice(i, 1);
    
    saveDataToLocalStorage();
    updateMainTable();
}

function confirmRemoveUserObject(i) {
    infoWindow.innerHTML = '';

    let confirmBox = document.createElement('div');
    confirmBox.classList.add('confirm-box');
    infoWindow.append(confirmBox);

    let confirmBoxCell = document.createElement('div');
    confirmBoxCell.classList.add('confirm-box__cell');
    confirmBoxCell.innerHTML = 'Are You sure?';
    confirmBox.append(confirmBoxCell);

    let confirmButtonYes = createConfirmButtons('input', 'Delete', confirmBox);
    confirmButtonYes.addEventListener('click', () => removeUserObject(i));

    let confirmButtonNo = createConfirmButtons('input', 'Cancel', confirmBox);
    confirmButtonNo.addEventListener('click', () => closeWindow(confirmBox));
}

function validateInputs() {
    let inputId     = document.querySelector('.inputs1');
    let inputName   = document.querySelector('.inputs2');
    let inputAge    = document.querySelector('.inputs3');
    let inputJob    = document.querySelector('.inputs4');
    let inputNumber = document.querySelector('.inputs5');
    let inputCard   = document.querySelector('.inputs6'); 

    let valid = true;

    if (!inputId.value) {
        inputId.style.border = '1px solid red';
        valid = false;
    } else {
        inputId.style.border = 'none';
    }

    if (!inputName.value || (!isNaN(inputName.value))) {
        inputName.style.border = '1px solid red';
        valid = false;
    } else {
        inputName.style.border = 'none';
    }

    if (!inputAge.value || (isNaN(inputAge.value))) {
        inputAge.style.border = '1px solid red';
        valid = false;
    } else {
        inputAge.style.border = 'none';
    }

    if (!inputJob.value || (!isNaN(inputJob.value))) {
        inputJob.style.border = '1px solid red';
        valid = false;
    } else {
        inputJob.style.border = 'none';
    }

    let patternPhoneNumber = /^[0][0-9]{2}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;
    let resultPhoneNumber = patternPhoneNumber.test(inputNumber.value);

    if (!resultPhoneNumber) {
        inputNumber.style.border = '1px solid red';
        valid = false;
    } else {
        inputNumber.style.border = 'none';
    }

    let patternCreditCard = /^\d{4} \d{4} \d{4} \d{4}$/;
    let resultCreditCard = patternCreditCard.test(inputCard.value);

    if (!resultCreditCard) {
        inputCard.style.border = '1px solid red';
        valid = false;
    } else {
        inputCard.style.border = 'none';
    }
    return valid;
}

function createConfirmButtons(element, elementValue, parrentToAppend) {
    let button = document.createElement(element);
    button.setAttribute('type', 'button');
    button.setAttribute('value', elementValue);
    button.classList.add('confirm-box__buttons');
    parrentToAppend.append(button);
    return button;
}