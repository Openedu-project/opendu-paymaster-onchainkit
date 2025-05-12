# OpenEdu Paymaster

This is a [Next.js](https://nextjs.org) project bootstrapped with [create-onchain](https://github.com/coinbase/onchain-app-template) that demonstrates how to use Coinbase's Paymaster service to sponsor gas fees for NFT minting transactions.

## Features

- Mint NFTs with gas fees sponsored by Coinbase Paymaster
- Track transaction history
- User-friendly interface built with OnchainKit

## Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- Coinbase Developer Platform account for Paymaster & Bundler access
- Wallet Connect Project ID

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Setup

Create a `.env.local` file based on the `.env.local.example` template:

```bash
cp .env.local.example .env.local
```

Update the `.env.local` file with your credentials:

```bash
# Obtain from https://portal.cdp.coinbase.com/products/onchainkit
NEXT_PUBLIC_ONCHAINKIT_API_KEY="YOUR_ONCHAINKIT_API_KEY"

# Obtain from https://portal.cdp.coinbase.com/products/bundler-and-paymaster
NEXT_PUBLIC_PAYMASTER_URL="YOUR_PAYMASTER_URL"

# NFT Contract Address (Base Sepolia)
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="0x0f61205637D02A0799d981A4d9547751a74fB9fC"
```

## How It Works

### Paymaster Service

The Paymaster service allows for gas-free transactions by having a third party (in this case, Coinbase) pay for the gas fees. This is particularly useful for onboarding new users to Web3 applications without requiring them to have ETH for gas.

### Implementation Details

1. **OnchainKit Integration**: We use OnchainKit's Transaction component to handle the transaction flow.

2. **Paymaster Configuration**: The OnchainKitProvider is configured with the Paymaster URL from Coinbase Developer Platform.

3. **Transaction Sponsorship**: When a user initiates a mint transaction, the `isSponsored` flag is set to true, which routes the transaction through the Paymaster service.

## Important Notes

- The NFT contract must be allowlisted in the Coinbase Paymaster service.
- The contract's mint function must be compatible with the Paymaster service.
- For production use, you should implement proper error handling and transaction monitoring.

## Learn More

To learn more about OnchainKit, see the [documentation](https://onchainkit.xyz/getting-started).

To learn more about Next.js, see the [Next.js documentation](https://nextjs.org/docs).

To learn more about Coinbase Paymaster, see the [Coinbase Developer Platform](https://portal.cdp.coinbase.com).
