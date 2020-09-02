import random from './utils/random.js';
import getNode from './utils/getNode';

import Pokemon from './components/Pokemon.js';
import {renderLog, getLog} from './components/logs.js';

const player1 = new Pokemon({
  name: 'Pikachu',
  hp: 50,
  selectors: 'character',
  techniques: [
    {
      name: 'Thunder Jolt',
      id: 'thunder-jolt',
      damage: 20
    },
    {
      name: 'Thunder Wave',
      id: 'thunder-wave',
      damage: 15
    },
    {
      name: 'Thunder Shock',
      id: 'thunder-shock',
      damage: 25
    }
  ]
});

const player2 = new Pokemon({
  name: 'Charmander',
  hp: 150,
  selectors: 'enemy',
  techniques: [
    {
      name: 'Mega Punch',
      id: 'mega-punch',
      damage: 20
    },
    {
      name: 'Mega Kick',
      id: 'mega-kick',
      damage: 5
    },
    {
      name: 'Fire Punch',
      id: 'fire-punch',
      damage: 15
    }
  ]
});

const BUTTON_CLICKS_LIMIT = 3;
let $buttons;

function init() {
  renderLog('Start Game!');
  initButtons();
};

function initButtons() {
  $buttons = document.querySelectorAll('button');

  for (let i = 0; i < $buttons.length; i++) {
    const availableClicks = document.createElement('span');
    availableClicks.dataset.buttonLimit = true;
    availableClicks.classList.add('limit');
    availableClicks.innerText = `Available clicks: ${BUTTON_CLICKS_LIMIT}`;

    $buttons[i].appendChild(availableClicks);

    const setButtonLimit = btnClickLimit(BUTTON_CLICKS_LIMIT);
    $buttons[i].addEventListener('click', handleBtnClick.bind(this, setButtonLimit));
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
  const damage = button.dataset.damage;
  const player = button.dataset.player;
  const limit = fn();

  if (limit.end) {
    button.disabled = true;
  };

  buttonLimit.innerText = `Available clicks: ${BUTTON_CLICKS_LIMIT - limit.clicks}`;
  renderLog(`${button.id.toUpperCase()} clicks: ${limit.clicks}/${BUTTON_CLICKS_LIMIT}`);

  let state = null;
  const realDamage = random(damage);

  switch(player) {
    case player1.name:
      state = {
        endGame: player2.changeHP(realDamage),
        loserGame: player2.name,
        message: getLog(player2, player1, realDamage)
      };
      break;
    case player2.name:
      state = {
        endGame: player1.changeHP(realDamage),
        loserGame: player1.name,
        message: getLog(player1, player2, realDamage)
      };
      break;
  };

  renderLog(state.message);

  if (state.endGame) {
    gameOver(state.loserGame);
  };
};

function gameOver(name) {
  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].disabled = true;
  };

  renderLog(name + ' lost!');
  renderLog('Game over!');
};

init();