const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

let randomNumber;
let roundCount = 0;
let gameHistory = [];
let maxNum = 25;

//  RECEIVING Player Guess from CLIENT
app.post('/checkguess', (req, res) => {
  roundCount++;
  if (roundCount === 1) {
    randomNumberGen();
  }
  //gives req.body a name we can understand
  let playerGuesses = req.body;
  //adding roundCount to body object
  playerGuesses.roundCount = roundCount;
  //sends player guess object to checkPlayerGuesses
  checkPlayerGuesses(playerGuesses);
  //response: success! (2xx==success)
  res.sendStatus(201);
});

//  SENDING Round Data to CLIENT
app.get('/checkguess', (req, res) => { //route names... should these be the same or different?
  //console.log('get request sent');
  //sends object of player evaluated player guesses
    res.send(gameHistory);
});

app.post('/newgame', (req, res) => {
  console.log('in /newgame')
  console.log('req.body is ', req.body);
  gameHistory = [];
  roundCount = 0;
  res.sendStatus(201);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT, 'http://localhost:5000/')
})

function randomNumberGen() {
  randomNumber = (Math.floor(Math.random() * maxNum ))+1;
  console.log(randomNumber);
}

function checkPlayerGuesses(guessObject) {
//console.log(guessObject);
// compares player guesses to randomNumber
//playerOne
  if (guessObject.playerOne === String(randomNumber)) {
    guessObject.playerOne = `⭐ 🌟 ${randomNumber} 🌟 ⭐`;
    // winnerFound = 1;
  } else if (guessObject.playerOne < randomNumber) {
    guessObject.playerOne = 'low';
  } else if (guessObject.playerOne > randomNumber) {
    guessObject.playerOne = 'high';
  }
  //playerTwo
  if (guessObject.playerTwo === String(randomNumber)) {
    guessObject.playerTwo = `⭐ 🌟 ${randomNumber} 🌟 ⭐`;
  } else if (guessObject.playerTwo < randomNumber) {
    guessObject.playerTwo = 'low';
  } else if (guessObject.playerTwo > randomNumber) {
    guessObject.playerTwo = 'high';
  }
  //playerThree
  if (guessObject.playerThree === String(randomNumber)) {
    guessObject.playerThree = `⭐ 🌟 ${randomNumber} 🌟 ⭐`;
  } else if (guessObject.playerThree < randomNumber) {
    guessObject.playerThree = 'low';
  } else if (guessObject.playerThree > randomNumber) {
    guessObject.playerThree = 'high';
  }
    //pushes body object to player guess history array
    //console.log(guessObject);
    gameHistory.push(guessObject);
    //console.log(gameHistory);
}