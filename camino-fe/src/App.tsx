import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Management } from './pages/Management';
import { Business } from './pages/Business';
import { WalletProvider } from './contexts/WalletContext';

// Prime React imports
import './App.css';

function App() {
  return (
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
  );
}

export default App;
