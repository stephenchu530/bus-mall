'use strict';

// Array storing all store items
let allStoreItems = [];

// Array containing the previous 3 items
let prev3Items = {'item1': null, 'item2': null, 'item3': null};

// Array containing the current 3 items
let curr3Items = {'item1': null, 'item2': null, 'item3': null};

// Survey object in index.html
let survey = document.getElementById('survey');

// Number of remaining votes
let remainingVotes = 25;

// Store item constructor
let storeItem = function(imageName) {
  this.name = imageName.split('.')[0];
  this.filepath = `img/${imageName}`;
  this.views = 0;
  this.votes = 0;
  allStoreItems.push(this);
}

// Function to fill the current array with new items; no repeats
let get3NewItems = function() {
  prev3Items = curr3Items;
  curr3Items = {'item1': null, 'item2': null, 'item3': null};
  Object.keys(curr3Items).forEach(function(item) {
    let rand = Math.floor(Math.random() * allStoreItems.length);
    while (Object.values(prev3Items).includes(allStoreItems[rand]) || Object.values(curr3Items).includes(allStoreItems[rand])) {
      rand = Math.floor(Math.random() * allStoreItems.length);
    }
    curr3Items[item] = allStoreItems[rand];
    allStoreItems[rand].views++;
  });
}

// Function to render items
let renderItems = function () {
  get3NewItems();
  Object.keys(curr3Items).forEach(function(item) {
    let imgEl = document.getElementById(item);
    imgEl.src = curr3Items[item].filepath;
    imgEl.alt = curr3Items[item].name;
    imgEl.title = curr3Items[item].name;
  });
  let remaining = document.getElementById('remainingVotes');
  remaining.textContent = remainingVotes;
}

// Event handler for user selection
let handleItemSelect = function(e) {
  if (Object.keys(curr3Items).includes(e.target.id)) {
    remainingVotes--;
    curr3Items[e.target.id].votes++;
    renderItems();
    if (remainingVotes === 0) {
      survey.removeEventListener('click', handleItemSelect);
    }
  }
}

// Make store items
new storeItem('bag.jpg');
new storeItem('banana.jpg');
new storeItem('bathroom.jpg');
new storeItem('boots.jpg');
new storeItem('breakfast.jpg');
new storeItem('bubblegum.jpg');
new storeItem('chair.jpg');
new storeItem('cthulhu.jpg');
new storeItem('dog-duck.jpg');
new storeItem('dragon.jpg');
new storeItem('pen.jpg');
new storeItem('pet-sweep.jpg');
new storeItem('scissors.jpg');
new storeItem('shark.jpg');
new storeItem('sweep.png');
new storeItem('tauntaun.jpg');
new storeItem('unicorn.jpg');
new storeItem('usb.gif');
new storeItem('water-can.jpg');
new storeItem('wine-glass.jpg');

// Display the first selection of items
renderItems();

// Event listener for user selection
survey.addEventListener('click', handleItemSelect);
