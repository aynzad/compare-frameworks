import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { PageLayout, Card, PokemonCard } from "@repo/ui";
import { Home, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";

// Layout Component
function Layout() {
  const location = useLocation();

  const sidebarItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: Home,
      isActive: location.pathname === "/",
    },
    {
      label: "Pokémon",
      href: "/pokemon",
      icon: BarChart2,
      isActive: location.pathname === "/pokemon",
    },
  ];

  return (
    <PageLayout
      sidebar={{ items: sidebarItems }}
      header={<h1 className="text-xl font-semibold">React Router App</h1>}
    >
      <Outlet />
    </PageLayout>
  );
}

// Dashboard Page
function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Welcome to React Router</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a simple dashboard to showcase React Router.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium">Framework Comparison</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Compare different React frameworks side by side.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium">Pokémon List</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check out the Pokémon list page to see data fetching in action.
          </p>
        </Card>
      </div>
    </div>
  );
}

// Pokemon Page
function Pokemon() {
  interface PokemonData {
    id: number;
    name: string;
    imageUrl: string;
  }

  const [pokemon, setPokemon] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
        );
        const data = await res.json();

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const id = pokemon.url.split("/")[6];
            return {
              id: parseInt(id || "0"),
              name: pokemon.name,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
          })
        );

        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pokémon List</h1>
      <p className="text-muted-foreground">
        Data fetched from the PokéAPI using React hooks.
      </p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemon.map((p) => (
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              imageUrl={p.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "pokemon",
        element: <Pokemon />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
