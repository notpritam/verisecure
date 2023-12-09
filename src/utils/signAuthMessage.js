import { ethers } from 'ethers';

const signAuthMessage = async () => {
    // Ensure window.ethereum is available (MetaMask or similar)
    if (!window.ethereum) {
        alert('Ethereum provider not found. Please install MetaMask or another wallet.');
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // Request account access
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Fetch the authentication message from your backend or Push Protocol
    const messageRequested = 'Your authentication message'; // Replace with actual message
    const signedMessage = await signer.signMessage(messageRequested);

    return {
        signedMessage,
        publicKey: address
    };
};

module.exports = { signAuthMessage };
