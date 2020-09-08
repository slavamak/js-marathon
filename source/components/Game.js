import getNode from '../utils/getNode.js';
import random from '../utils/random.js';

import Pokemon from './Pokemon.js';

class Game {
  constructor(api) {
    this.api = api;
    this.renderLog('Welcome to Game!');
  };

  start = async () => {
    this.renderLog('Loading...');

    await this.setPlayers();

    this.renderLog('Start Game!');
    this.renderPlayers();

    window.game = this;
  };

  end = (player, callback) => {
    const $buttons = document.querySelectorAll('.pokemon__attacks-button');

    for (let i = 0; i < $buttons.length; i++) {
      $buttons[i].disabled = true;
    };

    player && this.renderLog(player + ' lost!');
    this.renderLog('Game over!');

    callback && callback();
  };

  restart = async () => {
    this.renderLog('Restart Game!');

    this.player1.destroy();
    this.player2.destroy();

    await this.setPlayers();
    this.renderPlayers();
  };

  setPlayers = async () => {
    const player1 = await this.api.getRandomPokemon();
    const player2 = await this.api.getRandomPokemon();

    this.player1 = new Pokemon({
      ...player1,
      game: this,
      selector: 'player1'
    });
    this.player2 = new Pokemon({
      ...player2,
      game: this,
      selector: 'player2'
    });

    window.player1 = this.player1;
    window.player2 = this.player2;
  };

  renderPlayers = () => {
    this.player1.render();
    this.player2.render();
  };
  
  setPlayersDamage = (player, id) => {
    let damage;
    const _this = this;

    switch(true) {
      case (this.player1 === player):
        set(this.player1, this.player2, id);
        break;
      case (this.player2 === player):
        set(this.player2, this.player1, id);
        break;
    };

    async function set(character, enemy, id) {
      let endGame = false;

      damage = await _this.api.getFight(character.id, id, enemy.id);

      endGame = enemy.changeHP(damage.kick.player2);
      _this.renderLog(_this.getLog(enemy, character, damage.kick.player2));

      if (endGame) {
        _this.end(enemy.name);
        return;
      };

      endGame = character.changeHP(damage.kick.player1);
      _this.renderLog(_this.getLog(character, enemy, damage.kick.player1));

      if (endGame) {
        _this.end(character.name);
        return;
      };
    };
  };

  getLog = (firstPokemon, secondPokemon, count) => {
    const logs = [
      `${firstPokemon.name} вспомнил что-то важное, но неожиданно ${secondPokemon.name}, не помня себя от испуга, ударил в предплечье врага.`,
      `${firstPokemon.name} поперхнулся, и за это ${secondPokemon.name} с испугу приложил прямой удар коленом в лоб врага.`,
      `${firstPokemon.name} забылся, но в это время наглый ${secondPokemon.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
      `${firstPokemon.name} пришел в себя, но неожиданно ${secondPokemon.name} случайно нанес мощнейший удар.`,
      `${firstPokemon.name} поперхнулся, но в это время ${secondPokemon.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
      `${firstPokemon.name} удивился, а ${secondPokemon.name} пошатнувшись влепил подлый удар.`,
      `${firstPokemon.name} высморкался, но неожиданно ${secondPokemon.name} провел дробящий удар.`,
      `${firstPokemon.name} пошатнулся, и внезапно наглый ${secondPokemon.name} беспричинно ударил в ногу противника.`,
      `${firstPokemon.name} расстроился, как вдруг, неожиданно ${secondPokemon.name} случайно влепил стопой в живот соперника.`,
      `${firstPokemon.name} пытался что-то сказать, но вдруг, неожиданно ${secondPokemon.name} со скуки, разбил бровь сопернику.`
      ];
    
      const info = ` -${count} [${firstPokemon.hp.current}/${firstPokemon.hp.total}]`;
      const log =  logs[random(0, logs.length - 1)] + info;
    
      return log;
    };

  renderLog = (string) => {
    const logs = getNode('#logs');
    const p = document.createElement('p');
    p.innerText = '###: ' + string;

    logs.insertBefore(p, logs.children[0]);
  };
}

export default Game;