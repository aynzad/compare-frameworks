import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("pokemon", "routes/pokemon.index.tsx"),
  route("pokemon/:id", "routes/pokemon.$id.tsx"),
] satisfies RouteConfig;
