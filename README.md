# Crypto Coins Browser

A web application leverages the CoinGecko API to provide up-to-date information on various cryptocurrencies. Users can browse market data, as well as detailed information on individual coins.  

## Live Version

Check out the live version [here](https://crypto-coins-browser.vercel.app).

## Features

- Browse cryptocurrency market data.
- View detailed information on individual cryptocurrencies.
- Responsive and user-friendly interface.

## Available Routes

- `/coins/markets` - View market data for various cryptocurrencies.
- `/coins/[id]` - Access detailed information about a specific cryptocurrency, e.g., `/coins/bitcoin`.

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [CoinGecko API](https://www.coingecko.com/en/api) - Cryptocurrency data API for fetching real-time market and coin data.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm or pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/panoskouff/crypto-coins-browser.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Start the development server
   ```sh
   pnpm run dev
   ```
   Navigate to `http://localhost:3000` to view the app.

### Scripts

- `pnpm run dev` - Runs the app in development mode.
- `pnpm run build` - Builds the app for production.
- `pnpm run start` - Starts the production server.
- `pnpm run lint` - Runs ESLint to catch linting errors.
- `pnpm run format` - Formats code using Prettier.
- `pnpm run test` - Runs tests.
- `pnpm run test:watch` - Runs tests in watch mode.

