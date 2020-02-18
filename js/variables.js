'use strict';

const users = [
    { id: '1', name: 'Jonh', age: '30', job: 'developer' },
    { id: '2', name: 'Bill', age: '28', job: 'singer'    },
    { id: '3', name: 'Kate', age: '23', job: 'racer'     },
];

let defaultUsers = users;

const tableWrap      = document.getElementById('table-wrap');
const table          = document.getElementById('table');
const infoWindow     = document.getElementById('info-window');
const tableButtonAdd = document.getElementById('table__button-add');