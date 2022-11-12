'use strict';
//-----------------------------------------------------------
/*
Variable declaration
*/
const playerTurn = document.querySelectorAll('.player'); //Nodelist of the two players player1 = 0, player2 = 1
const currentScore = document.querySelectorAll('.current-score'); //same as above fr current score
const overallScore = document.querySelectorAll('.score'); //same as above for overall score
let activePlayerIndex = 0; // The player whose turn it is to play. Always start with player 1 = 0
const GAMEOVERSCORE = 50;
//-----------------------------------------------------------
const rollDiceBtn = document.querySelector('.btn--roll'); //roll dice button
const holdBtn = document.querySelector('.btn--hold'); // Hold button. Saves Points
const newGameBtn = document.querySelector('.btn--new'); // Restart the game button
//-----------------------------------------------------------
const diceImg = document.querySelector('.dice'); //Image of the dice displayed
let isPlaying = true; //the state of the game. Ongoing or over.
//-----------------------------------------------------------

const getActivePlayerIndex = function () {
  //Helper function to retrieve the index of the active player.
  if (playerTurn[0].classList.contains('player--active')) {
    activePlayerIndex = 0;
  } else {
    activePlayerIndex = 1;
  }
  return activePlayerIndex;
};

const changeActivePlayer = function () {
  /*
  Function that changes the active player from player 1, to player 2
  and reverse.
  */
  playerTurn.forEach(element => {
    element.classList.toggle('player--active');
  });
};

//-----------------------------------------------------------

const calcCurrentScore = function (roll) {
  /*
 Helper Function that takes the roll and
 calculates the current score for the active player.
  */
  currentScore[activePlayerIndex].textContent = `${
    Number(currentScore[activePlayerIndex].textContent) + roll
  }`;
};
//-----------------------------------------------------------

const rollDice = function () {
  /*helper function. roll a dice for the active player and get the appropriate png, and the actual diceroll.
    if the roll is equal to 1, the current score becomes 0.
    Additionally, the active player loses their turn and the other player becomes active
  */
  const num = Math.round(Math.random() * 5 + 1);
  getActivePlayerIndex();
  diceImg.src = `dice-${num}.png`;

  if (num === 1) {
    currentScore[activePlayerIndex].textContent = '0';
    changeActivePlayer();
  } else {
    calcCurrentScore(num);
  }
  return diceImg;
};
//-----------------------------------------------------------

function toggleButtons() {
  //helper function. Depending on the state of the game "isPlaying" ,
  //the roll dice and hold buttons get enabled or disabled.

  rollDiceBtn.disabled = isPlaying ? false : true;
  holdBtn.disabled = isPlaying ? false : true;
}
//-----------------------------------------------------------

function checkWinner() {
  /*
    helper function. Checks if there is a winner and displays a message.
    Additionally,game is over and disables all buttons except new game.
  */

  if (Number(overallScore[activePlayerIndex].textContent) >= GAMEOVERSCORE) {
    isPlaying = false;
    toggleButtons();
    alert(`Player ${activePlayerIndex + 1} Wins!!!`);
  }
}
//-----------------------------------------------------------

//add event on click of "Roll Dice" Button.
rollDiceBtn.addEventListener('click', rollDice);

/*add event on click to Hold button. We sum the overall
  score with the current score, check for a winner, and change
  active player.
*/
holdBtn.addEventListener('click', function () {
  getActivePlayerIndex();

  overallScore[activePlayerIndex].textContent = `${
    Number(overallScore[activePlayerIndex].textContent) +
    Number(currentScore[activePlayerIndex].textContent)
  }`;
  currentScore[activePlayerIndex].textContent = '0';

  checkWinner();
  changeActivePlayer();
});

/*
  Add event to new game button on click.
  Initialize game and enable all buttons.
*/

newGameBtn.addEventListener('click', function () {
  currentScore.forEach(element => {
    element.textContent = '0';
  });

  overallScore.forEach(element => {
    element.textContent = '0';
  });

  playerTurn[activePlayerIndex].classList.remove('player--active');
  playerTurn[0].classList.add('player--active');
  activePlayerIndex = 0;

  diceImg.src = 'dice-6.png';
  isPlaying = true;
  toggleButtons();
});
