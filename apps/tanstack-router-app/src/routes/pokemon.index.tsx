import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "@repo/ui";
import { getPokemonList, type PokemonData } from "@repo/api";

const pokemonListQueryOptions = {
  queryKey: ["pokemon"],
  queryFn: () => getPokemonList(),
};

export const Route = createFileRoute("/pokemon/")({
  component: PokemonList,
  loader: ({ context }) => {
    return context.queryClient.fetchQuery(pokemonListQueryOptions);
  },
});

function PokemonList() {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery<PokemonData[]>(pokemonListQueryOptions);

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
          Error loading Pokémon:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  if (!pokemon?.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pokémon List</h1>
        <p className="text-muted-foreground">No Pokémon found.</p>
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
        {pokemon.map((p) => (
          <Link
            key={p.id}
            to="/pokemon/$id"
            params={{ id: p.id.toString() }}
            className="block"
          >
            <PokemonCard
              id={p.id}
              name={p.name}
              imageUrl={p.imageUrl}
              className="cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
