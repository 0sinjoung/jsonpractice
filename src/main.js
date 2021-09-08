'use strict';


// Fetch로 JSON 데이터 받아오기: response-body안에 json이 들어있음
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(data => data.items);
}

function createHTMLString(item) {
  return `
  <li class="item">
    <img class="item__thumnail" src=${item.src} alt=${item.color}_${item.type}>
    <span class="item__description">${item.gender}, ${item.size} size</span>
  </li>
  `;
}

function dispalyItems(items) {
  const container = document.querySelector('.lists');
  const htmlString = items.map(item => createHTMLString(item)).join('');
  container.innerHTML = htmlString;
}


function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {
    return;
  }

  const filteredItems = items.filter(item => item[key] === value);
  console.log(filteredItems);
  dispalyItems(filteredItems);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.shoping_nav');

  logo.addEventListener('click', () => dispalyItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}



// 자료를 받아올 때 시간이 걸리기 때문에 promise return
// main
loadItems()
  .then(items => {
    dispalyItems(items);
    setEventListeners(items);
  })
  .catch(console.log("ERROR"));
