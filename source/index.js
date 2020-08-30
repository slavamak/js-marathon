const getNode = selector => document.querySelector(selector);

const character = {
  name: 'Pikachu',
  hp: {
    default: 150,
    damage: 150
  },
  elHP: getNode('#health-character'),
  elProgressbar: getNode('#progressbar-character'),
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
  ],
  renderHP,
  changeHP,
  renderTechniques
};

const enemy = {
  name: 'Charmander',
  hp: {
    default: 100,
    damage: 100
  },
  elHP: getNode('#health-enemy'),
  elProgressbar: getNode('#progressbar-enemy'),
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
  ],
  renderHP,
  changeHP,
  renderTechniques
};

const BUTTON_CLICKS_LIMIT = 3;

function init() {
  character.renderHP();
  enemy.renderHP();

  character.renderTechniques();
  enemy.renderTechniques()

  renderLog('Start Game!');
};

function renderHP() {
  const {elHP, elProgressbar, hp: {default: base, damage}} = this;

  elHP.innerText = damage + ' / ' + base;
  elProgressbar.style.width =  damage / base * 100 + '%';
};

function renderTechniques() {
  const control = getNode('.control');
  const {name, techniques} = this;

  const container = document.createElement('div');
  container.classList.add('control__item');
  container.id = name;
  control.appendChild(container);

  for (let i = 0; i < techniques.length; i++) {
    const button = document.createElement('button');
    button.classList.add('button', 'control__item-button');
    button.id = techniques[i].id;
    button.dataset.damage = techniques[i].damage;

    const buttonName = document.createElement('span');
    buttonName.innerText = techniques[i].name;
    button.appendChild(buttonName);

    const availableClicks = document.createElement('span');
    availableClicks.dataset.buttonLimit = true;
    availableClicks.classList.add('limit');
    availableClicks.innerText = `Available clicks: ${BUTTON_CLICKS_LIMIT}`;

    button.appendChild(availableClicks);
    container.appendChild(button);

    const setButtonLimit = limit(BUTTON_CLICKS_LIMIT);
    button.addEventListener('click', handleBtnClick.bind(this, setButtonLimit))
  };
};

function handleBtnClick(fn, event) {
  const button = event.target;
  const buttonLimit = event.target.lastChild;
  const limit = fn();

  setDamage.call(this, event);

  if (limit.end) {
    button.disabled = true;
  };

  buttonLimit.innerText = `Available clicks: ${BUTTON_CLICKS_LIMIT - limit.clicks}`;
  renderLog(`${button.id.toUpperCase()} clicks: ${limit.clicks}/${BUTTON_CLICKS_LIMIT}`);
};

function limit(max) {
  let start = 0;

  return function() {
    ++start

    return {
      clicks: start,
      end: start >= max
    };
  };
};

function setDamage(e) {
  const {damage} = e.target.dataset;

  this === enemy ? character.changeHP(random(damage)) : enemy.changeHP(random(damage));
};

function changeHP(count = 10) {
  this.hp.damage -= count;

  if (this.hp.damage <= 0) {
    this.hp.damage = 0;
    gameOver.apply(this);
  };

  const message = this === enemy ? getLog(enemy, character, count) : getLog(character, enemy, count);
  renderLog(message);

  this.renderHP();
};

const random = num => Math.ceil(Math.random() * num);

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
};

init();