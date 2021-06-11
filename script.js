// variables
// --- DOM elements
const formElements = document.querySelector('form');

const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surename');
const emailInput = document.querySelector('#email');
const birthdateInput = document.querySelector('#birthdate');
const errorMessagge = document.querySelector('#error-message');

// --- table
const tableBody = document.querySelector('#table-output ');

// --- data
let users = [];

// functions

// functions registerUser adds user to:
// -- table
// -- localStorage

const registerUser = (e) => {
  e.preventDefault();

  let answer = '';

  for (let item of formElements) {
    if (!item.value) {
      answer += errorMessagge.innerText = `\n${item.id}`;
    } else {
      errorMessagge.innerText = '';
    }
  }

  if (answer) {
    return (errorMessagge.innerText = `Sorry you need to enter: ${answer}`);
  }

  let user = {
    name: nameInput.value,
    surname: surnameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
  };

  // add new data from form to table
  let tr = document.createElement('tr');

  for (let i in user) {
    let td = document.createElement('td');
    td.innerText = user[i];

    tr.appendChild(td);
  }

  tableBody.appendChild(tr);

  // get old data from localstorage

  let existingData = localStorage.getItem('array');
  // console.log(JSON.parse(existingData));

  // add user to local strogae
  users.push(user);
  let newdata = existingData ? JSON.parse(existingData) : [];
  newdata.push(user);
  // console.log(newdata);

  localStorage.setItem('array', JSON.stringify(newdata));

  formElements.reset();
};

const getDataFromLocalStorage = () => {
  if (localStorage.getItem('array')) {
    let data = JSON.parse(localStorage.getItem('array'));

    displayUsers(data);
  }
};

const displayUsers = (data) => {
  if (data) {
    data.forEach((object) => {
      let tr = document.createElement('tr');

      for (property in object) {
        let td = document.createElement(`td`);
        td.innerText = object[property];
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });
  }
};
// events
formElements.addEventListener('submit', registerUser);
document.addEventListener('DOMContentLoaded', getDataFromLocalStorage);
