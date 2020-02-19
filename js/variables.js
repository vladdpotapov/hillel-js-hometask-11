'use strict';

const users = [
    { id: '1', name: 'Jonh', age: '30', job: 'developer', number: '063-222-33-22', card: '1234 5678 9876 5432' },
    { id: '2', name: 'Bill', age: '28', job: 'singer',    number: '097-555-44-88', card: '9874 6521 4568 9874' },
    { id: '3', name: 'Kate', age: '23', job: 'racer',     number: '050-777-88-99', card: '1325 6548 9875 1236' },
];

let defaultUsers = users;

const tableWrap      = document.getElementById('table-wrap');
const table          = document.getElementById('table');
const infoWindow     = document.getElementById('info-window');
const tableButtonAdd = document.getElementById('table__button-add');