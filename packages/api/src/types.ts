export interface PokemonApiResponse {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string } }>;
  stats: [
    { base_stat: number }, // HP
    { base_stat: number }, // Attack
    { base_stat: number }, // Defense
    { base_stat: number }, // Special Attack
    { base_stat: number }, // Special Defense
    { base_stat: number }, // Speed
  ];
}

export interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonData {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PokemonDetailsData {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}
