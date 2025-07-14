// Chain configurations (RPC URLs, chain IDs, explorers)
export const CHAINS = {
  eth: {
    id: 1,
    name: "Ethereum",
    rpc: "https://eth.llamarpc.com",
    explorer: "https://etherscan.io"
  },
  bsc: {
    id: 56,
    name: "Binance Smart Chain",
    rpc: "https://bsc-dataseed.binance.org",
    explorer: "https://bscscan.com"
  },
  polygon: {
    id: 137,
    name: "Polygon",
    rpc: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com"
  },
  avax: {
    id: 43114,
    name: "Avalanche",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://snowtrace.io"
  },
  arbitrum: {
    id: 42161,
    name: "Arbitrum",
    rpc: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io"
  },
  optimism: {
    id: 10,
    name: "Optimism",
    rpc: "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io"
  }
};