export default class CartePokemon {
  constructor(donnees) {
    this.donnees = donnees;
  }

  creerElement() {
    const div = document.createElement('div');
    div.classList.add('cartePokemon');
    div.innerHTML = `
      <div class="cardPokemon">
        <img src="${this.donnees.sprite}" alt="${this.donnees.name}">
        <div class= "pokeNom">#${this.donnees.id} ${this.donnees.name}</div>
        <p>Type(s): ${this.donnees.apiTypes.map(t => t.name).join(', ')}</p>
      </div>
      `;

    div.addEventListener('click', () => {
      window.location.href = `details.html?id=${this.donnees.id}`;
    });

    return div;
  }
}
