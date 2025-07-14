import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { customers, interactions } from '../data/mockData';
import { 
  FaUsers, 
  FaChartLine, 
  FaRupeeSign, 
  FaCalendar,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Dashboard = () => {
  // Calculate dashboard statistics
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    prospects: customers.filter(c => c.status === 'prospect').length,
    inactiveCustomers: customers.filter(c => c.status === 'inactive').length,
    totalValue: customers.reduce((sum, c) => sum + c.value, 0),
    avgValue: customers.reduce((sum, c) => sum + c.value, 0) / customers.length,
    totalInteractions: interactions.length,
    recentInteractions: interactions.filter(i => {
      const interactionDate = new Date(i.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return interactionDate >= thirtyDaysAgo;
    }).length
  };

  // Prepare data for charts
  const statusData = [
    { name: 'Active', value: stats.activeCustomers, color: '#059669' },
    { name: 'Prospects', value: stats.prospects, color: '#d97706' },
    { name: 'Inactive', value: stats.inactiveCustomers, color: '#dc2626' }
  ];

  const industryData = customers.reduce((acc, customer) => {
    const industry = customer.industry;
    if (acc.find(item => item.name === industry)) {
      acc.find(item => item.name === industry).value += 1;
    } else {
      acc.push({ name: industry, value: 1 });
    }
    return acc;
  }, []);

  const valueByStatus = [
    { status: 'Active', value: customers.filter(c => c.status === 'active').reduce((sum, c) => sum + c.value, 0) },
    { status: 'Prospects', value: customers.filter(c => c.status === 'prospect').reduce((sum, c) => sum + c.value, 0) },
    { status: 'Inactive', value: customers.filter(c => c.status === 'inactive').reduce((sum, c) => sum + c.value, 0) }
  ];

  // Monthly interaction data (last 6 months)
  const monthlyInteractions = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = date.toLocaleString('default', { month: 'short' });
    const monthInteractions = interactions.filter(interaction => {
      const interactionDate = new Date(interaction.date);
      return interactionDate.getMonth() === date.getMonth() && 
             interactionDate.getFullYear() === date.getFullYear();
    }).length;
    monthlyInteractions.push({ month: monthName, interactions: monthInteractions });
  }

  // Top customers by value
  const topCustomers = customers
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map(customer => ({
      name: customer.name,
      value: customer.value,
      company: customer.company,
      status: customer.status
    }));

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: 0, 
              color: entry.color,
              fontSize: '12px'
            }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard">
      {/* Header Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <FaUsers size={32} color="#3b82f6" style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{stats.totalCustomers}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Customers</div>
        </div>
        
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <FaChartLine size={32} color="#059669" style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{formatCurrency(stats.totalValue)}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Value</div>
        </div>
        
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <FaCalendar size={32} color="#d97706" style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{stats.recentInteractions}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Recent Interactions</div>
        </div>
        
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <FaRupeeSign size={32} color="#dc2626" style={{ marginBottom: '10px' }} />
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>{formatCurrency(stats.avgValue)}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Average Value</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Customer Status Distribution */}
        <div className="card">
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            Customer Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Distribution */}
        <div className="card">
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            Customers by Industry
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Interactions Trend */}
        <div className="card">
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            Monthly Interactions Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyInteractions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="interactions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Value by Status */}
        <div className="card">
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            Total Value by Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={valueByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip 
                content={<CustomTooltip />}
                formatter={(value) => [formatCurrency(value), 'Value']}
              />
              <Bar dataKey="value" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="card">
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
          Top Customers by Value
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Rank</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Company</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Value</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#6b7280' }}>#{index + 1}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>{customer.name}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#6b7280' }}>{customer.company}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#059669', fontWeight: '600' }}>
                    {formatCurrency(customer.value)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className={`status-badge ${customer.status === 'active' ? 'status-active' : customer.status === 'prospect' ? 'status-prospect' : 'status-inactive'}`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {interactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((interaction, index) => {
              const customer = customers.find(c => c.id === interaction.customerId);
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px'
                  }}>
                    {interaction.type === 'call' ? '📞' : interaction.type === 'email' ? '📧' : '🤝'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                      {customer?.name} - {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {new Date(interaction.date).toLocaleDateString()} • {customer?.company}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: interaction.outcome === 'positive' ? '#dcfce7' : 
                                   interaction.outcome === 'negative' ? '#fef2f2' : '#f3f4f6',
                    color: interaction.outcome === 'positive' ? '#166534' : 
                           interaction.outcome === 'negative' ? '#dc2626' : '#6b7280'
                  }}>
                    {interaction.outcome}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 