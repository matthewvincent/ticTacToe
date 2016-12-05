var prompt = require('prompt');

function ticTacToe () {
  
  var board = [["*","*","*"],["*","*","*"],["*","*","*"]];
  var movesMade = 0;

  function addX(x, y) {
    board[x][y] = 'X';
  }

  function addO(x, y) {
    board[x][y] = 'O';
  }

  function showBoard() {
    var b = ''
    board.forEach(function (row){
      b = b + JSON.stringify(row) + '\n'
    });
    console.log(b)
  }

  function promptX() {
    console.log('X turn')
    prompt.get(['X', 'Y'], function(err, res) {
      if (err) { return console.log(err) }
      addX(res.X, res.Y);
      showBoard();
      movesMade += 1;
      if (!getWinner()) { return promptO() }
      else { startGame() }
    });
    
  }

  function promptO() {
    console.log('O turn')
    prompt.get(['X', 'Y'], function(err, res) {
      if (err) { return console.log(err) }
      addO(res.X, res.Y);
      showBoard();
      movesMade += 1;
      if (!getWinner()) { return promptX() }
      else { startGame() }
    });
    
  }

  function getWinner() {
    var dOneCounter = 0;
    var dTwoCounter = 2;

    var rowOne   = board[0].reduce(function(prev, next){ return prev + next}, "");
    var rowTwo   = board[1].reduce(function(prev, next){ return prev + next}, "");
    var rowThree = board[2].reduce(function(prev, next){ return prev + next}, "");

    var colOne   = board.reduce(function(prev, next){ return prev + next[0]}, "");
    var colTwo   = board.reduce(function(prev, next){ return prev + next[1]}, "");
    var colThree = board.reduce(function(prev, next){ return prev + next[2]}, "");

    var diagonalOne = board.reduce(function(prev, next){ 
      s = prev + next[dOneCounter] 
      dOneCounter += 1;
      return s;
    }, "");

    var diagonalTwo = board.reduce(function(prev, next){ 
      s = prev + next[dTwoCounter] 
      dOneCounter -= 1;
      return s;
    }, "");

    if (rowOne === 'XXX' 
      || rowTwo === 'XXX' 
      || rowThree === 'XXX' 
      || colOne === 'XXX' 
      || colTwo === 'XXX'
      || colThree === 'XXX'
      || diagonalTwo === 'XXX'
      || diagonalOne === 'XXX'
    ) {
      console.log ('X WINS');
      return true;
    } else if (
      rowOne === 'OOO' 
      || rowTwo === 'OOO' 
      || rowThree === 'OOO' 
      || colOne === 'OOO' 
      || colTwo === 'OOO'
      || colThree === 'OOO'
      || diagonalTwo === 'OOO'
      || diagonalOne === 'OOO'
    ) {
      console.log('O WINS');
      return true;
    } else if (movesMade === 9) {
      console.log('Stalemate');
      return true;
    }

    return false;
  }

  function startGame() {
    console.log('Starting a new game');
    showBoard();
    promptX();
  }

  return {
    startGame: startGame
  }
}

var newGame = ticTacToe();
newGame.startGame()