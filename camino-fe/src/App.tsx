import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { WalletProvider } from './contexts/WalletContext';
import { ToastProvider } from './contexts/ToastContext';
import Business from './pages/Business';
import Home from './pages/Home';

import './App.css';
import Purchase from './pages/Purchase';

function App() {
  return (
    <ToastProvider>
      <WalletProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/business" element={<Business />} />
                <Route path="/purchase" element={<Purchase />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletProvider>
    </ToastProvider>
  );
}

export default App;
