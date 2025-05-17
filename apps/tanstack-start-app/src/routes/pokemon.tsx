import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "@repo/ui";

interface PokemonData {
  id: number;
  name: string;
  imageUrl: string;
}

async function getPokemon() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
  );
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  const data = await res.json();

  return Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/")[6];
      return {
        id: parseInt(id || "0"),
        name: pokemon.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    })
  ) as Promise<PokemonData[]>;
}

export const Route = createFileRoute("/pokemon")({
  component: PokemonList,
});

function PokemonList() {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pokémon List</h1>
        <p className="text-muted-foreground">Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pokémon List</h1>
        <p className="text-muted-foreground">
          Error loading Pokémon: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pokémon List</h1>
      <p className="text-muted-foreground">
        Data fetched from the PokéAPI using TanStack Query.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemon?.map((p) => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
