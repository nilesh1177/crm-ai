import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaCalendar, 
  FaFileAlt, 
  FaRupeeSign, 
  FaGlobe, 
  FaUsers, 
  FaChartLine 
} from 'react-icons/fa';
import { interactions } from '../data/mockData';
import { format } from 'date-fns';

const CustomerDetail = ({ customer }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const customerInteractions = interactions.filter(i => i.customerId === customer.id);
  
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

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'call':
        return '📞';
      case 'email':
        return '📧';
      case 'meeting':
        return '🤝';
      default:
        return '📝';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'positive':
        return '#059669';
      case 'negative':
        return '#dc2626';
      case 'neutral':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>
            {customer.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <FaBuilding size={16} color="#6b7280" />
            <span style={{ fontSize: '16px', color: '#6b7280' }}>
              {customer.company}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669', marginBottom: '5px' }}>
            {formatCurrency(customer.value)}
          </div>
          <span className={`status-badge ${customer.status === 'active' ? 'status-active' : customer.status === 'inactive' ? 'status-inactive' : 'status-prospect'}`}>
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`btn ${activeTab === 'interactions' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('interactions')}
        >
          Interactions ({customerInteractions.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaEnvelope size={16} color="#6b7280" />
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Email</div>
                <div style={{ fontSize: '14px', color: '#1f2937' }}>{customer.email}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaPhone size={16} color="#6b7280" />
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Phone</div>
                <div style={{ fontSize: '14px', color: '#1f2937' }}>{customer.phone}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaMapMarkerAlt size={16} color="#6b7280" />
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Location</div>
                <div style={{ fontSize: '14px', color: '#1f2937' }}>{customer.location}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCalendar size={16} color="#6b7280" />
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Last Contact</div>
                <div style={{ fontSize: '14px', color: '#1f2937' }}>
                  {format(new Date(customer.lastContact), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>

            {customer.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaGlobe size={16} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Website</div>
                  <div style={{ fontSize: '14px', color: '#1f2937' }}>
                    <a href={customer.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      {customer.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {customer.employees && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaUsers size={16} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Employees</div>
                  <div style={{ fontSize: '14px', color: '#1f2937' }}>{customer.employees}</div>
                </div>
              </div>
            )}

            {customer.revenue && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaChartLine size={16} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Revenue</div>
                  <div style={{ fontSize: '14px', color: '#1f2937' }}>{customer.revenue}</div>
                </div>
              </div>
            )}

            {customer.founded && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaBuilding size={16} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Founded</div>
                  <div style={{ fontSize: '14px', color: '#1f2937' }}>{customer.founded}</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
              Industry & Notes
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FaBuilding size={16} color="#6b7280" />
              <span style={{ fontSize: '14px', color: '#1f2937' }}>
                <strong>Industry:</strong> {customer.industry}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FaFileAlt size={16} color="#6b7280" style={{ marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.5' }}>
                  <strong>Notes:</strong> {customer.notes}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'interactions' && (
        <div>
          {customerInteractions.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
              No interactions recorded yet
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {customerInteractions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(interaction => (
                  <div key={interaction.id} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#f9fafb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{getInteractionIcon(interaction.type)}</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', textTransform: 'capitalize' }}>
                            {interaction.type}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {format(new Date(interaction.date), 'MMM dd, yyyy')}
                            {interaction.duration && ` • ${interaction.duration} min`}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: getOutcomeColor(interaction.outcome) + '20',
                        color: getOutcomeColor(interaction.outcome)
                      }}>
                        {interaction.outcome.charAt(0).toUpperCase() + interaction.outcome.slice(1)}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                      {interaction.notes}
                    </div>
                    {interaction.followUp && (
                      <div style={{ marginTop: '10px', fontSize: '12px', color: '#6b7280' }}>
                        <strong>Follow-up:</strong> {format(new Date(interaction.followUp), 'MMM dd, yyyy')}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerDetail; 