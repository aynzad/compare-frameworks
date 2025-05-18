import type {
  PokemonApiResponse,
  PokemonListResponse,
  PokemonData,
  PokemonDetailsData,
} from "./types";

const POKE_API_BASE = "https://pokeapi.co/api/v2";
const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export async function getPokemonList(
  limit = 12,
  offset = 0
): Promise<PokemonData[]> {
  const res = await fetch(
    `${POKE_API_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }
  const data = (await res.json()) as PokemonListResponse;

  return Promise.all(
    data.results.map(async (pokemon) => {
      const id = pokemon.url.split("/")[6];
      if (!id) {
        throw new Error("Invalid Pokemon data");
      }
      return {
        id: parseInt(id, 10),
        name: pokemon.name,
        imageUrl: `${SPRITE_BASE}/${id}.png`,
      };
    })
  );
}

export async function getPokemonDetails(
  id: string
): Promise<PokemonDetailsData> {
  const res = await fetch(`${POKE_API_BASE}/pokemon/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon details");
  }
  const data = (await res.json()) as PokemonApiResponse;

  // Validate that we have all required stats
  if (data.stats.length !== 6) {
    throw new Error("Invalid Pokemon stats data");
  }

  return {
    id: data.id,
    name: data.name,
    imageUrl: `${SPRITE_BASE}/${data.id}.png`,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a) => a.ability.name),
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
  };
}
