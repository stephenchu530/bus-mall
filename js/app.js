'use strict';

// Array with all the store item names
let itemNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

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

// Results data and chart object used to render chart
let resultsData = {};

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
    while (Object.values(prev3Items).includes(rand) || Object.values(curr3Items).includes(rand)) {
      rand = Math.floor(Math.random() * allStoreItems.length);
    }
    curr3Items[item] = rand;
    allStoreItems[rand].views++;
  });
};

// Function to render items
let renderItems = function() {
  Object.keys(curr3Items).forEach(function(item) {
    let imgEl = document.getElementById(item);
    imgEl.src = allStoreItems[curr3Items[item]].filepath;
    imgEl.alt = imgEl.title = allStoreItems[curr3Items[item]].name;
  });
  let remaining = document.getElementById('remainingVotes');
  remaining.textContent = remainingVotes;
};

// Function to tally votes and fill resultsData object
let tallyVotes = function() {
  allStoreItems.forEach(function(item) {
    resultsData[item.name] = item.votes;
  });
};

// CHART STUFF
// Charts rendered using Chart JS v.2.6.0
// http://www.chartjs.org/
let drawChart = function() {
  let ctx = document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: Object.keys(resultsData),
      datasets: [{
        label: 'Vote Results',
        backgroundColor: '#3e95cd',
        data: Object.values(resultsData)
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Vote Results'
      }
    }
  });
};

// Function to initialize allStoreItems with local storage if present
let initializeStoreItems = function () {
  let storageData = JSON.parse(localStorage.getItem('storeItemStats'));
  if (storageData) {
    storageData.forEach(function(item) {
      let newItem = new StoreItem(item['filepath'].split('/')[1]);
      newItem.votes = item['votes'];
      newItem.views = item['views'];
    });
  } else {
    itemNames.forEach(function(name) {
      new StoreItem(name);
    });
    localStorage['storeItemStats'] = JSON.stringify(allStoreItems);
  }
};

// Event handler for user selection
let handleItemSelect = function(e) {
  if (e.target.id in curr3Items) {
    remainingVotes--;
    allStoreItems[curr3Items[e.target.id]].votes++;
    if (remainingVotes === 0) {
      survey.removeEventListener('click', handleItemSelect);
      localStorage['storeItemStats'] = JSON.stringify(allStoreItems);
      tallyVotes();
      drawChart();
    } else {
      get3NewItems();
    }
    renderItems();
  }
};

// Initialize store items
initializeStoreItems();

// Get the first 3 items and render them on screen
get3NewItems();
renderItems();

// Event listener for user selection
survey.addEventListener('click', handleItemSelect);
