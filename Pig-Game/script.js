'use strict';
//-----------------------------------------------------------
/*
Variable declaration
*/
let activePlayer = document.querySelector('.player--active'); // The player whose turn it is to play. Always start with player 1
const playerTurn = document.querySelectorAll('.player'); //array of the two players player1 = 0, player2 = 1
const currentScore = document.querySelectorAll('.current-score'); //same as above
const overallScore = document.querySelectorAll('.score'); //same as above
const GAMEOVERSCORE = 50;
//-----------------------------------------------------------
const rollDiceBtn = document.querySelector('.btn--roll'); //roll dice button
const holdBtn = document.querySelector('.btn--hold'); // Hold button. Saves Points
const newGameBtn = document.querySelector('.btn--new'); // Restart the game button
//-----------------------------------------------------------
const diceImg = document.querySelector('.dice'); //Image of the dice displayed
//-----------------------------------------------------------

const changeActivePlayer = function () {
  /*
  Function that changes the active player from player 1, to player 2
  and reverse.
  */
  if (activePlayer.classList.contains('player--0')) {
    activePlayer.classList.remove('player--active');
    const newActivePlayer = playerTurn[1];
    newActivePlayer.classList.add('player--active');
    activePlayer = newActivePlayer;
  } else {
    activePlayer.classList.remove('player--active');
    const newActivePlayer = playerTurn[0];
    newActivePlayer.classList.add('player--active');
    activePlayer = newActivePlayer;
  }
  return activePlayer;
};
//-----------------------------------------------------------

const calcCurrentScore = function (playerIndex, roll) {
  /*
 Helper Function that takes the player's index (0 or 1) and the roll.
 Calculates the current score for that player.
  */
  currentScore[playerIndex].textContent = `${
    Number(currentScore[playerIndex].textContent) + roll
  }`;
};
//-----------------------------------------------------------

const rollDice = function (player) {
  /*helper function. roll a dice for the active player and get the appropriate png, and the actual diceroll.
    if the roll is equal to 1, the current score and the overall score become 0.
    Additionally, the active player loses their turn and the other player becomes active
  */
  const num = Math.round(Math.random() * 5 + 1);
  diceImg.src = `dice-${num}.png`;
  if (player.classList.contains('player--0')) {
    if (num === 1) {
      currentScore[0].textContent = '0';
      overallScore[0].textContent = '0';
      changeActivePlayer();
    } else {
      calcCurrentScore(0, num);
    }
  } else {
    if (num === 1) {
      currentScore[1].textContent = '0';
      overallScore[1].textContent = '0';
      changeActivePlayer();
    } else {
      calcCurrentScore(1, num);
    }
    return diceImg;
  }
};
//-----------------------------------------------------------

function toggleButtons() {
  rollDiceBtn.disabled = rollDiceBtn.disabled ? false : true;
  holdBtn.disabled = holdBtn.disabled ? false : true;
}
//-----------------------------------------------------------

function checkWinner() {
  /*
    helper function. Checks if there is a winner and displays a message.
    Additionally, disables all buttons except new game.
    Game ends at 50 points currently.
  */
  if (Number(overallScore[0].textContent) >= GAMEOVERSCORE) {
    toggleButtons();
    alert(`Player 1 Wins!!!`);
  } else if (Number(overallScore[1].textContent) >= GAMEOVERSCORE) {
    toggleButtons();
    alert(`Player 2 Wins!!!`);
  }
}
//-----------------------------------------------------------

//add event on click of "Roll Dice" Button.
rollDiceBtn.addEventListener('click', function () {
  rollDice(activePlayer);
});

/*add event on click to Hold button. We sum the overall
  score with the current score, check for a winner and change
  active player.
*/
holdBtn.addEventListener('click', function () {
  if (activePlayer.classList.contains('player--0')) {
    overallScore[0].textContent = `${
      Number(overallScore[0].textContent) + Number(currentScore[0].textContent)
    }`;
    currentScore[0].textContent = '0';
  } else {
    overallScore[1].textContent = `${
      Number(overallScore[1].textContent) + Number(currentScore[1].textContent)
    }`;
    currentScore[1].textContent = '0';
  }
  checkWinner();
  changeActivePlayer();
});

/*
  Add event to new game button on click.
  Initialize all values and enable all buttons.
*/
newGameBtn.addEventListener('click', function () {
  toggleButtons();
  currentScore.forEach(element => {
    element.textContent = '0';
  });

  overallScore.forEach(element => {
    element.textContent = '0';
  });
  activePlayer.classList.remove('player--active');
  const startPlayer = document.querySelector('.player--0');
  startPlayer.classList.add('player--active');
  activePlayer = startPlayer;
  diceImg.src = 'dice-6.png';
});
