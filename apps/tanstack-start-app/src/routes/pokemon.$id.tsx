import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetails } from "@repo/ui";
import { getPokemonDetails, type PokemonDetailsData } from "@repo/api";

const pokemonDetailsQueryOptions = (id: string) => ({
  queryKey: ["pokemon", id] as const,
  queryFn: () => getPokemonDetails(id),
});

export const Route = createFileRoute("/pokemon/$id")({
  component: PokemonDetailsPage,
  loader: ({ context, params }) => {
    return context.queryClient.fetchQuery(
      pokemonDetailsQueryOptions(params.id)
    );
  },
});

function PokemonDetailsPage() {
  const { id } = Route.useParams();
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery<PokemonDetailsData>(pokemonDetailsQueryOptions(id));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pokémon Details</h1>
        <p className="text-muted-foreground">Loading Pokémon details...</p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pokémon Details</h1>
        <p className="text-muted-foreground">
          Error loading Pokémon:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pokémon Details</h1>
      <p className="text-muted-foreground">
        Detailed information about {pokemon.name}.
      </p>
      <PokemonDetails {...pokemon} />
    </div>
  );
}
