export function getTypeColor(type) {
      const colors = {
            Feu: '#f08030',
            Eau: '#6890f0',
            Plante: '#78c850',
            Électrik: '#f8d030',
            Psy: '#f85888',
            Glace: '#98d8d8',
            Dragon: '#7038f8',
            Ténèbres: '#705848',
            Fée: '#ee99ac',
            Normal: '#a8a878',
            Combat: '#c03028',
            Sol: '#e0c068',
            Vol: '#a890f0',
            Insecte: '#a8b820',
            Roche: '#b8a038',
            Spectre: '#705898',
            Poison: '#a040a0',
            Acier: '#b8b8d0'
  }
  return colors[type]
}