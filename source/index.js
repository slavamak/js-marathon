const character = {
  name: 'Pikachu',
  defaultHP: 150,
  damageHP: 150,
  elHP: document.querySelector('#health-character'),
  elProgressbar: document.querySelector('#progressbar-character'),
  renderHP,
  changeHP
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.querySelector('#health-enemy'),
  elProgressbar: document.querySelector('#progressbar-enemy'),
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

  console.log('Start Game!');
};

function renderHP() {
  this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
  this.elProgressbar.style.width =  this.damageHP / this.defaultHP * 100 + '%';
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
  if (this.damageHP < count) {
    this.damageHP = 0;
    gameOver.apply(this);
  } else {
    this.damageHP -= count;
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

  alert(this.name + ' lost!');
};

init();