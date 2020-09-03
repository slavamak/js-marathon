import random from './utils/random.js';
import getNode from './utils/getNode.js';

import Game from './components/Game.js';
import Pokemon from './components/Pokemon.js';

import {pokemons} from './data/pokemons.js';

const game = new Game({
  pokemons
});

const $buttonStart = getNode('#start');
$buttonStart.addEventListener('click', handleBtnStart);

const $buttonRestart = getNode('#restart');
$buttonRestart .addEventListener('click', handleBtnRestart);

function handleBtnStart() {
  game.start();
  initButtons();
  this.classList.add('hide');
  $buttonRestart.classList.remove('hide');
};

function handleBtnRestart() {
  game.restart();
  initButtons();
};

function initButtons() {
  const $buttons = document.querySelectorAll('.pokemon__attacks-button');

  for (let i = 0; i < $buttons.length; i++) {
    const counter = btnClickLimit($buttons[i].dataset.count);
    $buttons[i].addEventListener('click', handleBtnClick.bind(this, counter));
  };
};

function btnClickLimit(max) {
  let start = 0;

  return function() {
    ++start

    return {
      clicks: start,
      end: start >= max
    };
  };
};

function handleBtnClick(fn, event) {
  const button = event.target;
  const buttonLimit = button.lastChild;
  const minDamage = button.dataset.min;
  const maxDamage = button.dataset.min;
  const maxCount = button.dataset.count;
  const player = button.dataset.player;
  const limit = fn();

  if (limit.end) {
    button.disabled = true;
  };

  buttonLimit.innerText = `Available clicks: ${maxCount - limit.clicks}`;

  const log = 
  game.renderLog(`${button.dataset.name} clicks: ${limit.clicks}/${maxCount}`);

  let state = null;
  const realDamage = random(minDamage, maxDamage);

  switch(player) {
    case player1.selector:
      state = {
        endGame: player2.changeHP(realDamage),
        loserGame: player2.name,
        message: game.getLog(player2, player1, realDamage)
      };

      !player2.changeHP(realDamage) && changeEnemyHP(player1, player2);
      break;
    case player2.selector:
      state = {
        endGame: player1.changeHP(realDamage),
        loserGame: player1.name,
        message: game.getLog(player1, player2, realDamage)
      };

      !player1.changeHP(realDamage) && changeEnemyHP(player2, player1);
      break;
  };

  game.renderLog(state.message);

  if (state.endGame) {
    game.end(state.loserGame);
  };
};

function changeEnemyHP(character, enemy) {
  const {name, maxCount, minDamage, maxDamage} = enemy.attacks[0];
  const damage = random(minDamage, maxDamage);

  setTimeout(() => {
    character.changeHP(damage)
    game.renderLog(game.getLog(character, enemy, damage));
  }, 1000);
};