import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { MenuItem } from 'primereact/menuitem';

import geeseIcon from '../assets/geese-icon.png';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { walletState, connectWallet, disconnectWallet } = useWallet();

  const items: MenuItem[] = [
    {
      label: 'Wild Geese',
      icon: <img src={geeseIcon} alt="Home Icon" style={{ width: '40px', height: '40px', marginRight: '10px' }} />,
      command: () => navigate('/'),
    },
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'Management',
      icon: 'pi pi-cog',
      command: () => navigate('/management'),
    },
    {
      label: 'Business',
      icon: 'pi pi-briefcase',
      command: () => navigate('/business'),
    },
  ];

  const end = (
    <Button
      label={walletState.isConnected ? `${walletState.accounts[0].substring(0, 6)}...${walletState.accounts[0].substring(38)}` : 'Connect Wallet'}
      icon={`pi ${walletState.isConnected ? 'pi-sign-out' : 'pi-wallet'}`}
      onClick={walletState.isConnected ? disconnectWallet : connectWallet}
      severity={walletState.isConnected ? 'secondary' : 'info'}
    />
  );

  return <Menubar model={items} end={end} className="mb-4" />;
};
