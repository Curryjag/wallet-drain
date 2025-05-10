# Testnet Wallet Approval & Drainer Simulation

This project simulates a wallet drainer pattern on Sepolia testnet. **Do not use on mainnet** — for educational and testing purposes only.

## Features
- Frontend (HTML + JS) lets user connect wallet and approve spending
- Backend script simulates attacker draining tokens

## Setup

### Frontend
1. Replace token and attacker addresses in `app.js`
2. Open `index.html` in browser
3. Connect MetaMask and approve

### Backend
1. Run `npm install ethers dotenv`
2. Create `.env` with your attacker private key and Infura project ID
3. Replace values in `drain.js`
4. Run: `node drain.js`

### Smart Contract
Deploy a simple ERC-20 token to Sepolia using Remix.

## Legal Note
This code is provided strictly for security education and simulation. Do not attempt to use this in any unauthorized or harmful way.
