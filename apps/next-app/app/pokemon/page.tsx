import { PokemonCard } from "@repo/ui";
import { getPokemonList, type PokemonData } from "@repo/api";
import Link from "next/link";

export default async function PokemonPage() {
  const pokemon = await getPokemonList();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pokémon List</h1>
      <p className="text-muted-foreground">
        Data fetched from the PokéAPI using Server Components.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemon.map((p: PokemonData) => (
          <Link key={p.id} href={`/pokemon/${p.id}`}>
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
