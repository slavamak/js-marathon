class Api {
  constructor(url) {
    this.pokemons = `${url}/pokemons?`;
    this.fight = `${url}/fight?`;
  };

  fetch = async (request) => {
    const response = await fetch(request);
    const body = await response.json();

    return body;
  };

  getPokemons = async () => {
    const body = await this.fetch(this.pokemons);

    return body;
  };

  getPokemon = async (pokemon) => {
    let request = null;

    typeof pokemon === 'number' ? request = `id=${pokemon}` : request = `name=${pokemon}`;
    const body = await this.fetch(`${this.pokemons}${request}`);

    return body;
  };

  getRandomPokemon = async () => {
    const body = await this.fetch(`${this.pokemons}random=true`);

    return body;
  };

  getFight = async (player1, attackID, player2) => {
    const body = await this.fetch(`${this.fight}player1id=${player1}&attackId=${attackID}&player2id=${player2}`);

    return body;
  };
};

export default Api;