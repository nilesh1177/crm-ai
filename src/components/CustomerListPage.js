import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaCalendar, 
  FaChartLine, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaClock,
  FaRupeeSign,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaEye
} from 'react-icons/fa';
import { customers, interactions } from '../data/mockData';
import { format } from 'date-fns';

const CustomerListPage = ({ onSelectCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastContact');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Calculate customer statistics
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    prospects: customers.filter(c => c.status === 'prospect').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalValue: customers.reduce((sum, c) => sum + c.value, 0),
    avgValue: customers.reduce((sum, c) => sum + c.value, 0) / customers.length
  };

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesIndustry = industryFilter === 'all' || customer.industry === industryFilter;
      
      return matchesSearch && matchesStatus && matchesIndustry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'value':
          return b.value - a.value;
        case 'lastContact':
          return new Date(b.lastContact) - new Date(a.lastContact);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const getCustomerInteractions = (customerId) => {
    return interactions.filter(i => i.customerId === customerId);
  };

  const getRecentActivity = (customerId) => {
    const customerInteractions = getCustomerInteractions(customerId);
    return customerInteractions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle size={16} color="#059669" />;
      case 'prospect':
        return <FaClock size={16} color="#d97706" />;
      case 'inactive':
        return <FaExclamationTriangle size={16} color="#dc2626" />;
      default:
        return <FaClock size={16} color="#6b7280" />;
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

  return (
    <div className="customer-list-page">
      {/* Header with Stats */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>
            Customer Management
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e40af' }}>{stats.total}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Total Customers</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>{stats.active}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Active</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#d97706' }}>{stats.prospects}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Prospects</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>{stats.inactive}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Inactive</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>
              {formatCurrency(stats.totalValue)}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Total Value</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <FaSearch size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
                style={{ paddingLeft: '35px' }}
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
            style={{ width: 'auto', minWidth: '120px' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="prospect">Prospect</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="input"
            style={{ width: 'auto', minWidth: '140px' }}
          >
            <option value="all">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail">Retail</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Logistics">Logistics</option>
            <option value="Education">Education</option>
            <option value="Construction">Construction</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
            style={{ width: 'auto', minWidth: '140px' }}
          >
            <option value="lastContact">Last Contact</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="value">Value</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Customer Grid/List */}
      <div style={{ 
        display: viewMode === 'grid' ? 'grid' : 'block',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(400px, 1fr))' : 'none',
        gap: viewMode === 'grid' ? '20px' : '10px'
      }}>
        {filteredCustomers.map(customer => {
          const recentActivity = getRecentActivity(customer.id);
          const totalInteractions = getCustomerInteractions(customer.id).length;
          
          return (
            <div
              key={customer.id}
              className="card customer-card"
              style={{
                cursor: 'pointer',
                border: selectedCustomer?.id === customer.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                backgroundColor: selectedCustomer?.id === customer.id ? '#f0f9ff' : 'white',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                setSelectedCustomer(customer);
                onSelectCustomer(customer);
              }}
            >
              {/* Customer Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    {getStatusIcon(customer.status)}
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                      {customer.name}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <FaBuilding size={14} color="#6b7280" />
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{customer.company}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaMapMarkerAlt size={14} color="#6b7280" />
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{customer.location}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#059669', marginBottom: '5px' }}>
                    {formatCurrency(customer.value)}
                  </div>
                  <span className={`status-badge ${getStatusColor(customer.status)}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaEnvelope size={14} color="#6b7280" />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{customer.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaPhone size={14} color="#6b7280" />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{customer.phone}</span>
                </div>
                {customer.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaGlobe size={14} color="#6b7280" />
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {customer.website.replace('https://', '')}
                    </span>
                  </div>
                )}
              </div>

              {/* Company Details */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '12px', color: '#6b7280' }}>
                {customer.employees && (
                  <span>👥 {customer.employees} employees</span>
                )}
                {customer.founded && (
                  <span>🏢 Founded {customer.founded}</span>
                )}
                {customer.revenue && (
                  <span>💰 {customer.revenue}</span>
                )}
              </div>

              {/* Recent Activity */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                    Recent Activity ({totalInteractions} total)
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Last: {format(new Date(customer.lastContact), 'MMM dd')}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {recentActivity.map((interaction, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '11px',
                      color: '#6b7280'
                    }}>
                      <span style={{ textTransform: 'capitalize' }}>
                        {interaction.type} • {format(new Date(interaction.date), 'MMM dd')}
                      </span>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        backgroundColor: interaction.outcome === 'positive' ? '#dcfce7' : 
                                       interaction.outcome === 'negative' ? '#fef2f2' : '#f3f4f6',
                        color: interaction.outcome === 'positive' ? '#166534' : 
                               interaction.outcome === 'negative' ? '#dc2626' : '#6b7280'
                      }}>
                        {interaction.outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCustomer(customer);
                  }}
                >
                  <FaEye size={14} style={{ marginRight: '5px' }} />
                  View Details
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to calendar functionality
                  }}
                >
                  <FaCalendar size={14} style={{ marginRight: '5px' }} />
                  Schedule Call
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <FaUsers size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>No customers found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default CustomerListPage; 