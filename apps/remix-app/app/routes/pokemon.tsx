import { PokemonCard } from "@repo/ui";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokémon List - Remix App" },
    {
      name: "description",
      content: "A list of Pokémon using Remix loader data",
    },
  ];
};

type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
  );
  const data = await res.json();

  const pokemon = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/")[6];
      return {
        id: parseInt(id || "0"),
        name: pokemon.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    })
  );

  return json({ pokemon });
}

export default function PokemonRoute() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pokémon List</h1>
      <p className="text-muted-foreground">
        Data fetched from the PokéAPI using Remix loaders.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemon.map((p: Pokemon) => (
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
