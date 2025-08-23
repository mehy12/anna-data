import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CropListing from './CropListing';
import PostCrop from './PostCrop';
import TractorRental from './TractorRental';
import PostTractor from './PostTractor';
import Weather from './Weather';
import Government from './Government';
import Profile from './Profile';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('anna_data_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('anna_data_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('anna_data_user');
    setCurrentPage('login');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Route to appropriate component based on current page
  const renderPage = () => {
    if (!user && currentPage !== 'register') {
      return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
    }

    if (!user && currentPage === 'register') {
      return <Register onLogin={handleLogin} onNavigate={navigateTo} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'crops':
        return <CropListing user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'post-crop':
        return <PostCrop user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'tractors':
        return <TractorRental user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'post-tractor':
        return <PostTractor user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'weather':
        return <Weather user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'government':
        return <Government user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      default:
        return <Dashboard user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;