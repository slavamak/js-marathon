import random from './utils/random.js';
import getNode from './utils/getNode.js';

import Game from './components/Game.js';
import Pokemon from './components/Pokemon.js';
import Api from './components/Api.js';

const api = new Api('https://reactmarathon-api.netlify.app/api');

const game = new Game(api);

const $buttonStart = getNode('#start');
$buttonStart.addEventListener('click', handleBtnStart);

const $buttonRestart = getNode('#restart');
$buttonRestart .addEventListener('click', handleBtnRestart);

function handleBtnStart() {
  game.start();
  this.classList.add('hide');
  $buttonRestart.classList.remove('hide');
};

function handleBtnRestart() {
  game.restart();
};