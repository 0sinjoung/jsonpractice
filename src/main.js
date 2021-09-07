'use strict';


// Fetch로 JSON 데이터 받아오기: response-body안에 json이 들어있음
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}




// 시간이 걸리기 때문에 promise return
// main
loadItems()
  .then(items => {
    console.log(items);
    // dispalyItems(items);
    // setEventListeners(items);
  })
  .catch(console.log("ERROR"));
