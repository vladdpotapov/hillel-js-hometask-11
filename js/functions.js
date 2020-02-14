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

        cellActions.append(createRowActionButton('View'));
        cellActions.append(createRowActionButton('Edit'));
        cellActions.append(createRowActionButton('Delete'));
    }
}

function createRowActionButton(value) {
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', value);
    button.classList.add('table__button');
    return button;
}