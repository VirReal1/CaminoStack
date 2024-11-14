import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { WalletProvider } from './contexts/WalletContext';

// Prime React imports
import './App.css';
import { ToastProvider } from './contexts/ToastContext';
import Business from './pages/Business';
import Home from './pages/Home';
import Management from './pages/Management';

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
                <Route path="/management" element={<Management />} />
                <Route path="/business" element={<Business />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletProvider>
    </ToastProvider>
  );
}

export default App;
