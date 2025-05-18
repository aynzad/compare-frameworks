import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { getPokemonList } from "@repo/api";
import { PokemonCard } from "@repo/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokémon List - Remix App" },
    {
      name: "description",
      content: "Browse through a list of Pokémon",
    },
  ];
};

export async function loader() {
  try {
    const pokemon = await getPokemonList(12, 0);
    return { pokemon };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Failed to fetch Pokemon list"
    ) {
      throw new Response("Failed to fetch Pokemon", { status: 500 });
    }
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export default function PokemonListRoute() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pokémon List</h1>
      <p className="text-muted-foreground">Browse through a list of Pokémon.</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemon.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="block"
          >
            <PokemonCard {...pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
