import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, type MetaFunction } from "@remix-run/react";
import { getPokemonDetails } from "@repo/api";
import { PokemonDetails } from "@repo/ui";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const pokemon = await getPokemonDetails(id);
    return { pokemon };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Failed to fetch Pokemon details"
    ) {
      throw new Response("Not Found", { status: 404 });
    }
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Pokémon Not Found - Remix App" },
      {
        name: "description",
        content: "The requested Pokémon could not be found.",
      },
    ];
  }

  const { pokemon } = data;

  return [
    { title: `${pokemon.name} - Remix App` },
    {
      name: "description",
      content: `Detailed information about ${pokemon.name}`,
    },
  ];
};

export default function PokemonDetailsRoute() {
  const { pokemon } = useLoaderData<typeof loader>();

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
