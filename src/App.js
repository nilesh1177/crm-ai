import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import AISuggestions from './components/AISuggestions';
import CustomerListPage from './components/CustomerListPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { customers } from './data/mockData';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [user, setUser] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('dashboard');
    setSelectedCustomer(null);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view !== 'detail') {
      setSelectedCustomer(null);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setCurrentView('detail');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'list':
        return <CustomerListPage onSelectCustomer={handleCustomerSelect} />;
      case 'detail':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <CustomerDetail customer={selectedCustomer} />
            <AISuggestions customerId={selectedCustomer?.id} />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange}
        user={user}
        onLogout={handleLogout}
      />
      <main className="container" style={{ padding: '20px 0' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App; 