# Compare Frameworks Monorepo

This project is a sample monorepo designed to compare major front-end frameworks (such as Next.js, Remix, React Router, TanStack Router, and more) in terms of User Experience (UX), Developer Experience (DX), and performance. It provides a unified environment to evaluate and contrast these frameworks using similar app structures and features.

## Installation

1. **Clone the repository:**
   ```sh
   git clone git@github.com:aynzad/compare-frameworks.git
   cd compare-frameworks
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
   > You can also use `npm` or `yarn` if you prefer, but `pnpm` is recommended for monorepos.

## Running the Apps

To run all apps in parallel, use the following command:

```sh
pnpm dev:all
```

Each framework app is located in the `apps/` directory. To run a specific app, use the following command:

```sh
pnpm --filter <app-name> dev
```

Replace `<app-name>` with one of the available apps, such as `next-app`, `remix-app`, `react-router-app`, `tanstack-router-app`, or `tanstack-start-app`.

For example, to run the Next.js app:
```sh
pnpm --filter next-app dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `next-app`: a [Next.js](https://nextjs.org/) app
- `remix-app`: a [Remix](https://remix.run/) app
- `react-router-app`: a [React Router](https://reactrouter.com/) app
- `tanstack-router-app`: a [TanStack Router](https://tanstack.com/router) app
- `tanstack-start-app`: a [TanStack Start](https://tanstack.com/start) app

### Packages

- `@repo/ui`: a shared React component library
- `@repo/eslint-config`: shared ESLint configurations
- `@repo/typescript-config`: shared TypeScript configurations
- `@repo/tailwind-config`: shared Tailwind CSS configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```