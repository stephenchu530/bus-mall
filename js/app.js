'use strict';

// Array storing all store items
let allStoreItems = [];

// Object containing the previous 3 items
let prev3Items = {'item1': null, 'item2': null, 'item3': null};

// Object containing the current 3 items
let curr3Items = {'item1': null, 'item2': null, 'item3': null};

// Survey object in index.html
let survey = document.getElementById('survey');

// Number of remaining votes
let remainingVotes = 25;

// Results object used to render chart
let resultsData = {}

// Store item constructor
let StoreItem = function(imageName) {
  this.name = imageName.split('.')[0];
  this.filepath = `img/${imageName}`;
  this.views = 0;
  this.votes = 0;
  allStoreItems.push(this);
};

// Function to fill the curr3Items object with new items; no repeats
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
};

// Function to render items
let renderItems = function() {
  Object.keys(curr3Items).forEach(function(item) {
    let imgEl = document.getElementById(item);
    imgEl.src = curr3Items[item].filepath;
    imgEl.alt = curr3Items[item].name;
    imgEl.title = curr3Items[item].name;
  });
  let remaining = document.getElementById('remainingVotes');
  remaining.textContent = remainingVotes;
};

// Function to tally votes and fill resultsData object
let tallyVotes = function() {
  allStoreItems.forEach(function(item) {
    resultsData[item.name] = item.votes;
  });
}

// Event handler for user selection
let handleItemSelect = function(e) {
  if (Object.keys(curr3Items).includes(e.target.id)) {
    remainingVotes--;
    curr3Items[e.target.id].votes++;
    if (remainingVotes === 0) {
      survey.removeEventListener('click', handleItemSelect);
      tallyVotes();
    } else {
      get3NewItems();
    }
    renderItems();
  }
};

// Make store items
new StoreItem('bag.jpg');
new StoreItem('banana.jpg');
new StoreItem('bathroom.jpg');
new StoreItem('boots.jpg');
new StoreItem('breakfast.jpg');
new StoreItem('bubblegum.jpg');
new StoreItem('chair.jpg');
new StoreItem('cthulhu.jpg');
new StoreItem('dog-duck.jpg');
new StoreItem('dragon.jpg');
new StoreItem('pen.jpg');
new StoreItem('pet-sweep.jpg');
new StoreItem('scissors.jpg');
new StoreItem('shark.jpg');
new StoreItem('sweep.png');
new StoreItem('tauntaun.jpg');
new StoreItem('unicorn.jpg');
new StoreItem('usb.gif');
new StoreItem('water-can.jpg');
new StoreItem('wine-glass.jpg');

// Get the first 3 items and render them on screen
get3NewItems();
renderItems();

// Event listener for user selection
survey.addEventListener('click', handleItemSelect);
