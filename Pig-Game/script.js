'use strict';
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--hold');
let diceImg = document.querySelector('.dice');
const rollDice = function () {
  //helper function. roll a dice and get the appropriate png
  let num = Math.round(Math.random() * 6);
  if (num === 0) {
    num = 1;
  }
  diceImg.src = `dice-${num}.png`;
  return diceImg;
};
//add event on click to show the right image of the dice
rollDiceBtn.addEventListener('click', rollDice);
