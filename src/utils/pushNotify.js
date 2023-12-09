// pushSetup.js
// import { PushAPI } from '@pushprotocol/restapi';
// import { ethers } from 'ethers';

// const initPush = async () => {
//   if (!window.ethereum) {
//     throw new Error('Ethereum provider not found');
//   }

//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   await provider.send('eth_requestAccounts', []);
//   const signer = provider.getSigner();

//   try {
//     const user = await PushAPI.initialize(signer, { env: 'staging' }); // Use 'staging' for testing
//     return user;
//   } catch (error) {
//     console.error("Error initializing Push Protocol:", error);
//     throw error;
//   }
// };

// export default initPush;

import { PushAPI } from '@pushprotocol/restapi';
import { useVariable } from '@/lib/storage';

const initPush = async (signer) => {
  
  try {
    console.log("siger", signer)
    const user = await PushAPI.initialize(signer, { env: 'staging' });
    return user;
  } catch (error) {
    console.error("Error initializing Push Protocol:", error);
    throw error;
  }
};

export default initPush;
