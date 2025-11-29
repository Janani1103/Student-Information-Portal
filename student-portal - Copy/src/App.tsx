import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 bg-light">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default App;