import React from 'react';
import {
  FaBrain,
  FaChartLine,
  FaExclamationTriangle,
  FaBullseye,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaBolt
} from 'react-icons/fa';
import aiService from '../services/aiService';

const AISuggestions = ({ customerId }) => {
  const [suggestions, setSuggestions] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (customerId) {
      setLoading(true);
      // Simulate AI processing time
      setTimeout(() => {
        const aiResults = aiService.generateTalkingPoints(customerId);
        setSuggestions(aiResults);
        setLoading(false);
      }, 1000);
    }
  }, [customerId]);

  if (!customerId) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
          <FaBrain size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>AI Suggestions</h3>
          <p>Select a customer to get AI-powered talking points</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
            <FaBrain size={20} color="#3b82f6" />
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
              AI is analyzing customer data...
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '30%',
              height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '2px',
              animation: 'loading 1.5s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!suggestions) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
          <FaExclamationTriangle size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>No Suggestions Available</h3>
          <p>Unable to generate AI suggestions for this customer</p>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#059669';
    if (confidence >= 0.6) return '#d97706';
    return '#dc2626';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <FaBrain size={24} color="#3b82f6" />
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
          AI Talking Points
        </h3>
        <div style={{
          marginLeft: 'auto',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: getConfidenceColor(suggestions.confidence) + '20',
          color: getConfidenceColor(suggestions.confidence)
        }}>
          {getConfidenceText(suggestions.confidence)}
        </div>
      </div>

      {suggestions.analysis && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
            Customer Analysis
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {suggestions.analysis.customerType && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaBullseye size={14} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Type</div>
                  <div style={{ fontSize: '14px', color: '#1f2937', textTransform: 'capitalize' }}>
                    {suggestions.analysis.customerType}
                  </div>
                </div>
              </div>
            )}

            {suggestions.analysis.engagementLevel && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaUsers size={14} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Engagement</div>
                  <div style={{ fontSize: '14px', color: '#1f2937', textTransform: 'capitalize' }}>
                    {suggestions.analysis.engagementLevel}
                  </div>
                </div>
              </div>
            )}

            {suggestions.analysis.budget && suggestions.analysis.budget.range && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaChartLine size={14} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Budget</div>
                  <div style={{ fontSize: '14px', color: '#1f2937' }}>
                    {suggestions.analysis.budget.range}
                  </div>
                </div>
              </div>
            )}

            {suggestions.analysis.timeline && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaClock size={14} color="#6b7280" />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Timeline</div>
                  <div style={{ fontSize: '14px', color: '#1f2937', textTransform: 'capitalize' }}>
                    {suggestions.analysis.timeline}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
          Suggested Talking Points
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {suggestions.suggestions.map((suggestion, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <FaBolt size={14} color="#3b82f6" style={{ marginTop: '2px' }} />
              <span style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                {suggestion}
              </span>
            </div>
          ))}
        </div>
      </div>

      {suggestions.analysis && suggestions.analysis.painPoints && suggestions.analysis.painPoints.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
            Pain Points Identified
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {suggestions.analysis.painPoints.map((painPoint, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#6b7280'
              }}>
                <FaExclamationTriangle size={12} color="#dc2626" />
                {painPoint}
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.analysis && suggestions.analysis.opportunities && suggestions.analysis.opportunities.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
            Opportunities
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {suggestions.analysis.opportunities.map((opportunity, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#059669'
              }}>
                <FaChartLine size={12} color="#059669" />
                {opportunity}
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.analysis && suggestions.analysis.riskFactors && suggestions.analysis.riskFactors.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#1f2937' }}>
            Risk Factors
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {suggestions.analysis.riskFactors.map((risk, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#dc2626'
              }}>
                <FaShieldAlt size={12} color="#dc2626" />
                {risk}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions; 