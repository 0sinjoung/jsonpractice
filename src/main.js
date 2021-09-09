'use strict';


// 1. Fetch로 JSON 데이터 받아오기: response-body안에 json이 들어있음
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(data => data.items);
}

// 2. display items ---------------------

function createHTMLString(item) {
  return `
  <li class="item" data-type=${item.type} data-color=${item.color}>
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


// 3. eventListener 등록 ------------------

function onButtonClick(event, lists) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {
    return;
  }

  // const filteredItems = items.filter(item => item[key] === value);
  updateItems(lists, key, value);
}

function updateItems(lists, key, value) {
  lists.forEach(item => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.shoping_nav');
  const lists = document.querySelectorAll('.item');

  logo.addEventListener('click', () => dispalyItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, lists));
}


// Main
// 1. loadItems: json 데이터 읽어오기 
// 자료를 받아올 때 시간이 걸리기 때문에 promise return
// 다 읽어오면(then) 아래 함수 실행
// 2. displayItems: 데이터 html에 표시하기
// 3. setEventListeners: 이벤트 리스너 등록
loadItems()
  .then(items => {
    dispalyItems(items);
    setEventListeners(items);
  })
  .catch(console.log("ERROR"));
