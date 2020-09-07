import getNode from '../utils/getNode.js';

class Pokemon {
  constructor({name, type, img, hp, selector, attacks}) {
    this.selector = selector;
    this.name = name;
    this.image = img;
    this.type = type;
    this.hp = {
      current: hp,
      total: hp
    };
    this.attacks = attacks;
  };

  render = () => {
    this.renderBody();
    this.renderHP();
    this.renderAttacks();
  };

  renderBody = () => {
    const {selector, name, image} = this;
    const playground = getNode('#playground');

    const body = `
      <div class="pokemon" id="${selector}">
        <div class="pokemon__inner ${selector}">
          <span class="lvl">Lv. 1</span>
          <img src="${image}" class="sprite" id="image">
          <div class="details">
            <h2 class="name" id="name">${name}</h2>
            <div class="hp">
              <div class="bar">
                <div class="health" id="progressbar"></div>
              </div>
              <span class="text" id="health"></span>
            </div>
          </div>
        </div>
      </div>
    `;

    playground.insertAdjacentHTML('beforeend', body);

    this.$player = getNode(`#${selector}`);
    this.$elHP = this.$player.querySelector('#health');
    this.$elProgressbar = this.$player.querySelector('#progressbar');
  };

  renderHP = () => {
    const {hp: {current, total}, $elHP, $elProgressbar} = this;
    const damage = current / total * 100;

    $elHP.innerText = current + ' / ' + total;
    $elProgressbar.style.width =  damage + '%';

    switch(true) {
      case (damage < 60 && damage > 20):
        $elProgressbar.classList.add('low');
        break;
      case (damage < 20):
        $elProgressbar.classList.add('critical');
        break;
    };
  };

  changeHP = (count, callback) => {
    let endGame = false;

    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      endGame = true;
    };

    this.renderHP();
    callback && callback(count);

    return endGame;
  };

  renderAttacks = () => {
    const {name, attacks} = this;

    const container = document.createElement('div');
    container.classList.add('pokemon__attacks');
    container.id = this.selector + name;
    this.$player.appendChild(container);

    for (let i = 0; i < attacks.length; i++) {
      const button = document.createElement('button');
      button.classList.add('button', 'pokemon__attacks-button');
      button.dataset.min = attacks[i].minDamage;
      button.dataset.max = attacks[i].maxDamage;
      button.dataset.count = attacks[i].maxCount;
      button.dataset.name = attacks[i].name;
      button.dataset.player = this.selector;
  
      const buttonName = document.createElement('span');
      buttonName.innerText = attacks[i].name;
      button.appendChild(buttonName);

      const availableClicks = document.createElement('span');
      availableClicks.dataset.buttonLimit = true;
      availableClicks.classList.add('limit');
      availableClicks.innerText = `Available clicks: ${attacks[i].maxCount}`;
      button.appendChild(availableClicks);

      container.appendChild(button);
    };
  };

  destroy = () => {
    this.$player.remove();
  };
}

export default Pokemon;