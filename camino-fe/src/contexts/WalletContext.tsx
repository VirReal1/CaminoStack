import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { IWalletState } from '../types/general-types';

interface WalletContextType {
  walletState: IWalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<IWalletState>({
    accounts: [],
    isConnected: false,
  });

  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setWalletState({
          accounts: accounts,
          isConnected: true,
        });
      } else {
        throw new Error('Please install MetaMask!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      accounts: [],
      isConnected: false,
    });
  };

  useEffect(() => {
    const checkConnection = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        setWalletState({
          accounts,
          isConnected: accounts.length > 0,
        });
      }
    };

    checkConnection();
  }, []);

  return <WalletContext.Provider value={{ walletState, connectWallet, disconnectWallet }}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
