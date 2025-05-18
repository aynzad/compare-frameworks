import { Card } from "@repo/ui";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix App" },
    { name: "description", content: "Framework comparison - Remix" },
  ];
};

export default function Index() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Welcome to Remix</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a simple dashboard to showcase Remix.
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
