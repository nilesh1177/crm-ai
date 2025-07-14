import React from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaRupeeSign 
} from 'react-icons/fa';

const CustomerList = ({ customers, selectedCustomer, onSelectCustomer }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'prospect':
        return 'status-prospect';
      default:
        return 'status-active';
    }
  };

  const formatCurrency = (value) => {
    // Convert to Indian Rupees (assuming value is in INR)
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  return (
    <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      {customers.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          No customers found
        </div>
      ) : (
        customers.map(customer => (
          <div
            key={customer.id}
            className={`card customer-card ${selectedCustomer?.id === customer.id ? 'selected' : ''}`}
            style={{
              cursor: 'pointer',
              margin: '10px',
              border: selectedCustomer?.id === customer.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
              backgroundColor: selectedCustomer?.id === customer.id ? '#f0f9ff' : 'white'
            }}
            onClick={() => onSelectCustomer(customer)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {customer.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                  <FaBuilding size={14} color="#6b7280" />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {customer.company}
                  </span>
                </div>
              </div>
              <span className={`status-badge ${getStatusColor(customer.status)}`}>
                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
              <FaEnvelope size={14} color="#6b7280" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {customer.email}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FaPhone size={14} color="#6b7280" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {customer.phone}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaRupeeSign size={14} color="#059669" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#059669' }}>
                {formatCurrency(customer.value)}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerList; 