import React from 'react';
import { 
  FaBrain, 
  FaUsers, 
  FaChartBar, 
  FaTh, 
  FaList,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa';

const Header = ({ currentView, onViewChange, user, onLogout }) => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaBrain size={32} />
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
              AI CRM
            </h1>
            <span style={{
              fontSize: '14px',
              opacity: 0.8,
              marginLeft: '10px'
            }}>
              Intelligent Customer Management
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <button
                onClick={() => onViewChange('dashboard')}
                style={{
                  background: currentView === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
              >
                <FaTh size={16} />
                Dashboard
              </button>
              <button
                onClick={() => onViewChange('list')}
                style={{
                  background: currentView === 'list' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
              >
                <FaList size={16} />
                Customer List
              </button>
            </div>

            {/* User Info and Logout */}
            {user && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FaUser size={14} />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    {user.username}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    opacity: 0.8,
                    textTransform: 'capitalize'
                  }}>
                    ({user.role})
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  style={{
                    background: 'rgba(220, 38, 38, 0.8)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 1)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.8)'}
                >
                  <FaSignOutAlt size={12} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 