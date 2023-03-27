'use strict';

// Retrieving DOM elements
var clickButton = document.getElementById('clickButton');
var confirmButton = document.getElementById('confirmButton');
var clickCount = document.getElementById('clickCount');
var nicknameInput = document.getElementById('nickname');
var rankingDiv = document.getElementById('ranking');

// Global variables
var clicks = 0;
var players = [];

// Function to display the ranking
function displayRanking() {
  var rankingHtml = '<table>';

  // Number of columns and rows to display
  var columns = 10;
  var rows = 10;

  // Maximum positions to display
  var maxPositions = 100;

  // Loops to display the ranking
  for (var i = 0; i < rows; i++) {
    rankingHtml += '<tr>';
    for (var j = 0; j < columns; j++) {
      var position = i * columns + j;
      var player = players[position];
      rankingHtml += '<td>';
      if (player) {
        rankingHtml += (position + 1) + '. ' + player.nickname + ' (' + player.score + ')';
      } else {
        rankingHtml += '-';
      }
      rankingHtml += '</td>';
      if (position === players.length - 1 || position === 99) {
        break;
      }
    }
    rankingHtml += '</tr>';
    if (position === players.length - 1 || position === 99) {
      break;
    }
  }

  rankingHtml += '</table>';
  rankingDiv.innerHTML = rankingHtml;
}

// Event when clicking on the click button
clickButton.addEventListener('click', function () {
  clicks += 1;
  clickCount.textContent = clicks;
});

// Event when clicking on the confirm nickname button
confirmButton.addEventListener('click', function () {
  var nickname = nicknameInput.value.trim();
  if (nickname) {
    // Adding the player to the players array
    players.push({ nickname: nickname, score: clicks });

    // Sorting players by descending score
    players.sort(function (a, b) {
      return b.score - a.score;
    });

    // Displaying the ranking and resetting clicks and nickname
    displayRanking();
    clicks = 0;
    clickCount.textContent = clicks;
    nicknameInput.value = '';
  }
  // Displaying the personal best score
  var personalBest = getPersonalBest();
  if (personalBest) {
    document.getElementById('personalBest').textContent = 'Personal Best Score: ' + personalBest;
  }
});

function getPersonalBest() {
  var personalBest = 0;
  for (var i = 0; i < players.length; i++) {
    if (players[i].nickname === nicknameInput.value.trim() && players[i].score > personalBest) {
      personalBest = players[i].score;
    }
  }
  return personalBest;
}
