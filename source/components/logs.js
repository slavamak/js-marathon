import getNode from '../utils/getNode.js';
import random from '../utils/random.js';

function renderLog(string) {
  const logs = getNode('#logs');
  const p = document.createElement('p');
  p.innerText = '###: ' + string;

  logs.insertBefore(p, logs.children[0]);
};

function getLog(firstPokemon, secondPokemon, count) {
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
  const log =  logs[random(logs.length - 1)] + info;

  return log;
};

export { renderLog, getLog };