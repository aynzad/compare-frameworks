import { PokemonDetails } from "@repo/ui";
import { getPokemonDetails } from "@repo/api";
import { notFound } from "next/navigation";

export default async function PokemonDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonDetails(id).catch(() => null);

  if (!pokemon) {
    notFound();
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
