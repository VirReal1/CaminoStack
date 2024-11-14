import React, { useMemo } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { MenuItem } from 'primereact/menuitem';

import geeseIcon from '../assets/geese-icon.png';
import '../assets/Navbar.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletState, connectWallet, disconnectWallet } = useWallet();

  const items = useMemo<MenuItem[]>(() => {
    return [
      {
        label: 'Wild Geese',
        icon: <img src={geeseIcon} alt="Home Icon" style={{ width: '40px', height: '40px', marginRight: '10px' }} />,
        command: () => navigate('/'),
        className: location.pathname === '/' ? 'active' : '',
      },
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => navigate('/'),
        className: location.pathname === '/' ? 'active' : '',
      },
      {
        label: 'Business',
        icon: 'pi pi-briefcase',
        command: () => navigate('/business'),
        className: location.pathname === '/business' ? 'active' : '',
      },
    ];
  }, [location, navigate]);

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
