const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.querySelector('#health-character'),
  elProgressbar: document.querySelector('#progressbar-character')
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.querySelector('#health-enemy'),
  elProgressbar: document.querySelector('#progressbar-enemy')
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

  renderHP(character);
  renderHP(enemy);

  console.log('Start Game!');
};

function renderHP(pokemon) {
  renderHPLife(pokemon);
  renderProgressbarHP(pokemon);
}

function renderHPLife(pokemon) {
  pokemon.elHP.innerText = pokemon.damageHP + ' / ' + pokemon.defaultHP;
};

function renderProgressbarHP(pokemon) {
  pokemon.elProgressbar.style.width = pokemon.damageHP + '%';
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
    causeDamage(button)
  };
};

function causeDamage(el) {
  el.addEventListener('click', function(e) {
    changeHP(random(e.target.dataset.damage), character);
    changeHP(random(e.target.dataset.damage), enemy);
  });
};

function changeHP(count, pokemon) {
  if (pokemon.damageHP < count) {
    pokemon.damageHP = 0;
    gameOver(pokemon.name);
  } else {
    pokemon.damageHP -= count;
  };

  renderHP(pokemon);
};

function random(num) {
  return Math.ceil(Math.random() * num)
};

function gameOver(pokemon) {
  const $buttons = document.querySelectorAll('button');

  for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].disabled = true;
  };
  
  alert(pokemon + ' lost!');
  
};

init();