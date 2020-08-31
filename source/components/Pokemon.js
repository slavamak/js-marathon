class Selectors {
  constructor(name) {
    this.elHP = document.querySelector(`#health-${name}`);
    this.elProgressbar = document.querySelector(`#progressbar-${name}`);
  }
};

class Pokemon extends Selectors {
  constructor({name, hp, selectors, techniques}) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp
    };
    this.techniques = techniques;
    this.renderHP();
    this.renderTechniques();
  };

  renderHP = () => {
    const {elHP, elProgressbar, hp: {current, total}} = this;

    elHP.innerText = current + ' / ' + total;
    elProgressbar.style.width =  current / total * 100 + '%';
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

  renderTechniques = () => {
    const control = document.querySelector('.control');
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
      button.dataset.player = this.name;
  
      const buttonName = document.createElement('span');
      buttonName.innerText = techniques[i].name;
      button.appendChild(buttonName);

      container.appendChild(button);
    };
  };
}

export default Pokemon;