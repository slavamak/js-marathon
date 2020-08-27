function getNode(selector) {
  return document.querySelector(selector);
};

const character = {
  name: 'Pikachu',
  hp: {
    default: 150,
    damage: 150
  },
  elHP: getNode('#health-character'),
  elProgressbar: getNode('#progressbar-character'),
  renderHP,
  changeHP
};

const enemy = {
  name: 'Charmander',
  hp: {
    default: 100,
    damage: 100
  },
  elHP: getNode('#health-enemy'),
  elProgressbar: getNode('#progressbar-enemy'),
  renderHP,
  changeHP
};

const techniques = [
  {
    name: 'Thunder Jolt',
    id: 'thunder-jolt',
    damage: 20
  },
  {
    name: 'Thunder Wave',
    id: 'thunder-wave',
    damage: 30
  },
  {
    name: 'Thunder Shock',
    id: 'thunder-shock',
    damage: 40
  }
];

function init() {
  renderTechniques(techniques);

  character.renderHP();
  enemy.renderHP()

  renderLog('Start Game!');
};

function renderHP() {
  const {elHP, elProgressbar, hp: {default: base, damage}} = this;

  elHP.innerText = damage + ' / ' + base;
  elProgressbar.style.width =  damage / base * 100 + '%';
};

function renderTechniques(array) {
  const control = document.querySelector('.control');

  for (let i = 0; i < array.length; i++) {
    const button = document.createElement('button');
    button.classList.add('button', 'control__item');
    button.id = array[i].id;
    button.dataset.damage = array[i].damage;
    button.innerText = array[i].name;

    control.appendChild(button);
    button.addEventListener('click', setDamage)
  };
};

function setDamage(e) {
  character.changeHP(random(e.target.dataset.damage));
  enemy.changeHP(random(e.target.dataset.damage));
};

function changeHP(count = 10) {
  this.hp.damage -= count;

  const message = this === enemy ? getLog(enemy, character, count) : getLog(character, enemy, count);
  renderLog(message);

  if (this.hp.damage <= 0) {
    this.hp.damage = 0;
    gameOver.apply(this);
  };

  this.renderHP();
};

function random(num) {
  return Math.ceil(Math.random() * num)
};

function gameOver() {
  const $buttons = document.querySelectorAll('button');

  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].disabled = true;
  };

  renderLog(this.name + ' lost!');
};

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

  const info = ` -${count} [${firstPokemon.hp.damage}/${firstPokemon.hp.default}]`;
  const log =  logs[random(logs.length - 1)] + info;

  return log;
}

init();