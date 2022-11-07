'use strict';

document.querySelector('.number').value = Math.round(Math.random() * 20);
let secretNumber = document.querySelector('.number').value;

if (secretNumber === 0) {
  secretNumber = 1;
}

/*
Add on click event to check button, to compare guess
with number and compute score and high score.
Also display the correct message.
 */
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (guess < secretNumber) {
    if (guess < 1) {
      // number cant be less than 1
      document.querySelector('.message').textContent =
        'Guess must be between 1 and 20!';
    } else {
      document.querySelector('.message').textContent =
        'Guess again...Go Higher!';
      document.querySelector('.score').textContent =
        Number(document.querySelector('.score').textContent) - 1;
    }
  } else if (guess > secretNumber) {
    if (guess > 20) {
      //number cant be greater than 20
      document.querySelector('.message').textContent =
        'Guess must be between 1 and 20!';
    } else {
      document.querySelector('.message').textContent =
        'Guess again...Go Lower!';
      document.querySelector('.score').textContent =
        Number(document.querySelector('.score').textContent) - 1;
    }
  } else {
    document.querySelector('.message').textContent = 'Bingo! Wanna go again?';
    document.querySelector('.check').disabled = true; //on win, the check button gets disabled
    if (
      Number(document.querySelector('.highscore').textContent) <
      Number(document.querySelector('.score').textContent)
    ) {
      document.querySelector('.highscore').textContent =
        document.querySelector('.score').textContent;
    }
    document.querySelector('.number').textContent =
      document.querySelector('.guess').value;
  }
  if (Number(document.querySelector('.score').textContent) === 0) {
    //if score = 0 then check button gets disabled and game over message is displayed
    document.querySelector('.check').disabled = true;
    document.querySelector('.message').textContent = 'Game Over! Try again!';
  }
});

/*
Adds event on click for the Again button. Re-initializes values except for high score.
*/
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('.check').disabled = false;

  document.querySelector('.number').textContent = '?';

  document.querySelector('.message').textContent = 'Start guessing...';

  document.querySelector('.score').textContent = '20';

  document.querySelector('.guess').value = null;

  document.querySelector('.number').value = Math.round(Math.random() * 20);
  secretNumber = document.querySelector('.number').value;
  if (secretNumber === 0) {
    secretNumber = 1;
  }
});
