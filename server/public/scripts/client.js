$(document).ready(onReady);

function onReady() {
  console.log("jquery is loaded!")
  $('#submit-btn').on('click', sendPlayerGuess);
  $('#newGame-btn').on('click', newGamePlease);
  //can we a .val() listener?
}

//  SENDING Player Guess to SERVER
function sendPlayerGuess() {
  let playerOne = $('#playerOne').val();
  let playerTwo = $('#playerTwo').val();
  let playerThree = $('#playerThree').val();
  $.ajax( { 
    method: 'POST',
    url: '/checkguess',
    data: {playerOne, playerTwo, playerThree}
  }).then(function(gameResponse) {
    console.log(gameResponse);
    fetchGameHistory();
    $('#playerOne').val('');
    $('#playerTwo').val('');
    $('#playerThree').val('');
  })
}

//  GETTING Round Data from SERVER 
function fetchGameHistory() {
  $.ajax( {
    type: 'GET',
    url: '/checkguess'
  }).then(function(historyResponse) {
    $('#tableBody').empty();
    for (let value of historyResponse) {
      $('#tableBody').prepend(`
        <tr>
          <td>${value.roundCount}</td>
          <td>${value.playerOne}</td>
          <td>${value.playerTwo}</td>
          <td>${value.playerThree}</td>
        </tr>
      `)
    }
  })
  
}

function newGamePlease() {
  $.ajax( { 
    method: 'POST',
    url: '/newgame',
    data: []
  }).then(function(gameResponse) {
    console.log(gameResponse);
    fetchGameHistory();
  })
}