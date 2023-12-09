import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const variables = (set) => ({
  name: '',
  isBatchManager: false,
  batchNumber: null,
  walletAddress: null,
  contract: null,
  signer : null,
  apiKey: null,

  updateWalletAddress: (wallet) => {
    set((state) => {
      return {
        walletAddress: wallet,
      };
    });
  },
  updateContractAddress: (address) => {
    set((state) => {
      return {
        contract: address,
      };
    });
  },
  updateSinger: (_signer) => {
    set((state) => {
      return {
        signer: _signer,
      };
    });
  },
  updateAPIKey: (_apiKey) => {
    set((state) => {
      return {
        apiKey: _apiKey,
      };
    });
  },
});

export const useVariable = create(variables);

// Do this to get the data

// const id = useUser((state) => state.id);
// const seatedCol = useUser((state) => state.seatedCol);
// const seatedRow = useUser((state) => state.seatedRow);
// const batch = useUser((state) => state.batchNumber);
