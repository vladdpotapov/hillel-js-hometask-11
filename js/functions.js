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

    let userInfoCloseButton = document.createElement('input');
    userInfoCloseButton.setAttribute('type', 'button');
    userInfoCloseButton.setAttribute('value', 'Close');
    userInfoCloseButton.classList.add('table__button');
    userInfoCloseButton.addEventListener('click', () => closeWindow(userInfoTable));
    userInfoTable.append(userInfoCloseButton);
}

function showUserEditCard(i) {
    infoWindow.innerHTML = '';

    let userInfoTable = document.createElement('table');
    userInfoTable.classList.add('table');
    infoWindow.append(userInfoTable);

    let userInfoCell;
    let userInfoRow;
    let userEditInput;
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
        userInfoTable.append(userEditInput);
    }

    let userInfoCloseButton = document.createElement('input');
    userInfoCloseButton.setAttribute('type', 'button');
    userInfoCloseButton.setAttribute('value', 'Close');
    userInfoCloseButton.classList.add('table__button');
    userInfoCloseButton.addEventListener('click', () => closeWindow(userInfoTable));
    userInfoTable.append(userInfoCloseButton);

    let userInfoSaveButton = document.createElement('input');
    userInfoSaveButton.setAttribute('type', 'button');
    userInfoSaveButton.setAttribute('value', 'Save');
    userInfoSaveButton.classList.add('table__button');
    userInfoSaveButton.addEventListener('click', function() {
        let userInputs = document.querySelectorAll('.edit__inputs');
        let array       = Object.values(users[i]);

        for (let i = 0; i < userInputs.length; i++) {
            if (array[i] !== userInputs[i].value) {
                array[i] = userInputs[i].value;
            } 
            // console.log(array[i]);
        }

        // const obj = {id: null, name: null};
        // const arr = ['11', 'qwerty'];

        // Object.keys(obj).forEach(function(key, index){
        // obj[key] = arr[index];
        // });

        const objProp = {id: null, name: null, age: null, job: null, number: null, card: null};
        Object.keys(objProp).forEach(function(key, index){
            objProp[key] = array[index];
        });
        // console.log(objProp);

        users.splice([i], 1, objProp);
        console.log(users);

        saveDataToLocalStorage();
        updateMainTable();
    });

    userInfoTable.append(userInfoSaveButton);
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
        for (let key in users[i]) {
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
            userInfoTable.append(userEditInput);
        }

        let userInfoCloseButton = document.createElement('input');
        userInfoCloseButton.setAttribute('type', 'button');
        userInfoCloseButton.setAttribute('value', 'Close');
        userInfoCloseButton.classList.add('table__button');
        userInfoCloseButton.addEventListener('click', () => closeWindow(userInfoTable));
        userInfoTable.append(userInfoCloseButton);

        let userInfoSaveButton = document.createElement('input');
        userInfoSaveButton.setAttribute('type', 'button');
        userInfoSaveButton.setAttribute('value', 'Save');
        userInfoSaveButton.classList.add('table__button');
        userInfoSaveButton.addEventListener('click', function() {
            let userInputs = document.querySelectorAll('.edit__inputs');
            let array       = Object.values(users[i]);
    
            for (let i = 0; i < userInputs.length; i++) {
                if (array[i] !== userInputs[i].value) {
                    array[i] = userInputs[i].value;
                } 
            }
 
            const objProp = {id: null, name: null, age: null, job: null, number: null, card: null};
            Object.keys(objProp).forEach(function(key, index){
                objProp[key] = array[index];
            });

            users.push(objProp);
            console.log(users);
    
            saveDataToLocalStorage();
            updateMainTable();
        });
        userInfoTable.append(userInfoSaveButton);
}

function closeWindow(itemToRemove) {
    itemToRemove.remove();
}

function saveDataToLocalStorage() {
    let stringifiedArray = JSON.stringify(users);
    localStorage.setItem('Users', stringifiedArray);
}

// function getDataFromLocalStorage() {
//         localStorage.getItem('Users');
//         let parsedArray = JSON.parse('Users');
//         users = parsedArray;
//         console.log(users);
// }

function getDataFromLocalStorage() {
    if (!localStorage.getItem('Users')) {
        return defaultUsers;
    }
    
    let parsedUsers = JSON.parse(localStorage.getItem('Users'));
    if (!parsedUsers) {
        return defaultUsers;
    }
    return parsedUsers;
}

function updateMainTable() {
    table.innerHTML = '';

    
    let headingRow = document.createElement('tr');
    headingRow.classList.add('table__row');
    table.append(headingRow);
    
    let headingCellId = document.createElement('th');
    headingCellId.classList.add('table__heading-cell');
    headingCellId.innerHTML = 'ID';
    headingRow.append(headingCellId);

    let headingCellName = document.createElement('th');
    headingCellName.classList.add('table__heading-cell');
    headingCellName.innerHTML = 'NAME';
    headingRow.append(headingCellName);

    let headingCellActinos = document.createElement('th');
    headingCellActinos.classList.add('table__heading-cell');
    headingCellActinos.innerHTML = 'ACTIONS';
    headingRow.append(headingCellActinos);

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

    let confirmButtonYes = document.createElement('input');
    confirmButtonYes.setAttribute('type', 'button');
    confirmButtonYes.setAttribute('value', 'Delete');
    confirmButtonYes.classList.add('confirm-box__buttons');
    confirmButtonYes.addEventListener('click', () => removeUserObject(i));
    confirmBox.append(confirmButtonYes);

    let confirmButtonNo = document.createElement('input');
    confirmButtonNo.setAttribute('type', 'button');
    confirmButtonNo.setAttribute('value', 'Cancel');
    confirmButtonNo.classList.add('confirm-box__buttons');
    confirmButtonNo.addEventListener('click', () => closeWindow(confirmBox));
    confirmBox.append(confirmButtonNo);
}

// Исправить: 
// 2. При удалении всех юзеров, нажимая на кнопку Add New User, форма создания всплывает, но без полей 
//    с именами свойств.

// Реализовать:
// 1. Сохранения измененных данных при перезагрузке страницы - localStorage.
// 2. Валидация всех текстовых полей ввода - регулярные выражения.
// 3. Оптимизация кода.

// Выполнено:
// 1. При удалении другого объекта сразу после удаления первого, окно подтверждения не всплывает.
