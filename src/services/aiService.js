import { customers, interactions, aiSuggestions } from '../data/mockData';

class AIService {
  // Analyze customer history and generate talking points
  generateTalkingPoints(customerId) {
    const customer = customers.find(c => c.id === customerId);
    const customerInteractions = interactions.filter(i => i.customerId === customerId);
    
    if (!customer || customerInteractions.length === 0) {
      return this.getDefaultSuggestions();
    }

    // Analyze customer profile and history
    const analysis = this.analyzeCustomer(customer, customerInteractions);
    const suggestions = this.generateSuggestions(analysis);
    
    return {
      customer: customer,
      analysis: analysis,
      suggestions: suggestions,
      confidence: this.calculateConfidence(analysis)
    };
  }

  analyzeCustomer(customer, interactions) {
    const analysis = {
      customerType: this.determineCustomerType(customer),
      painPoints: this.identifyPainPoints(interactions),
      interests: this.identifyInterests(interactions),
      budget: this.analyzeBudget(customer, interactions),
      timeline: this.analyzeTimeline(interactions),
      riskFactors: this.identifyRiskFactors(customer, interactions),
      opportunities: this.identifyOpportunities(customer, interactions),
      industryInsights: this.analyzeIndustrySpecifics(customer, interactions),
      decisionMaker: this.identifyDecisionMaker(interactions),
      engagementLevel: this.assessEngagementLevel(interactions)
    };

    return analysis;
  }

  determineCustomerType(customer) {
    if (customer.status === 'inactive') return 'reengagement';
    if (customer.value > 5000000) return 'enterprise'; // ₹50L+ for enterprise
    if (customer.industry === 'Manufacturing') return 'automation';
    if (customer.industry === 'Healthcare') return 'healthcare';
    if (customer.industry === 'Logistics') return 'logistics';
    if (customer.industry === 'Education') return 'education';
    if (customer.notes.includes('expand') || customer.notes.includes('new locations')) return 'expansion';
    if (customer.notes.includes('startup') || customer.notes.includes('funding')) return 'startup';
    
    return 'standard';
  }

  identifyPainPoints(interactions) {
    const painPoints = [];
    const notes = interactions.map(i => i.notes.toLowerCase());
    
    if (notes.some(note => note.includes('manual') || note.includes('efficiency'))) {
      painPoints.push('Manual processes causing inefficiency');
    }
    if (notes.some(note => note.includes('scale') || note.includes('growth'))) {
      painPoints.push('Scaling challenges');
    }
    if (notes.some(note => note.includes('implementation') || note.includes('timeline'))) {
      painPoints.push('Implementation timeline concerns');
    }
    if (notes.some(note => note.includes('training'))) {
      painPoints.push('Training and onboarding needs');
    }
    if (notes.some(note => note.includes('budget') || note.includes('cost'))) {
      painPoints.push('Budget constraints');
    }
    if (notes.some(note => note.includes('compliance') || note.includes('hipaa'))) {
      painPoints.push('Compliance and security requirements');
    }
    if (notes.some(note => note.includes('integration') || note.includes('existing'))) {
      painPoints.push('Integration with existing systems');
    }
    if (notes.some(note => note.includes('mobile') || note.includes('app'))) {
      painPoints.push('Mobile access requirements');
    }
    if (notes.some(note => note.includes('real-time') || note.includes('tracking'))) {
      painPoints.push('Real-time data and tracking needs');
    }

    return painPoints;
  }

  identifyInterests(interactions) {
    const interests = [];
    const notes = interactions.map(i => i.notes.toLowerCase());
    
    if (notes.some(note => note.includes('enterprise') || note.includes('premium'))) {
      interests.push('Enterprise features');
    }
    if (notes.some(note => note.includes('integration') || note.includes('api'))) {
      interests.push('Custom integrations');
    }
    if (notes.some(note => note.includes('automation'))) {
      interests.push('Process automation');
    }
    if (notes.some(note => note.includes('security') || note.includes('compliance'))) {
      interests.push('Security and compliance');
    }
    if (notes.some(note => note.includes('support') || note.includes('service'))) {
      interests.push('Dedicated support');
    }
    if (notes.some(note => note.includes('analytics') || note.includes('reporting'))) {
      interests.push('Analytics and reporting');
    }
    if (notes.some(note => note.includes('mobile') || note.includes('app'))) {
      interests.push('Mobile capabilities');
    }
    if (notes.some(note => note.includes('multi-location') || note.includes('centralized'))) {
      interests.push('Multi-location management');
    }
    if (notes.some(note => note.includes('roi') || note.includes('efficiency'))) {
      interests.push('ROI and efficiency improvements');
    }

    return interests;
  }

  analyzeBudget(customer, interactions) {
    const budgetInfo = {
      range: this.estimateBudgetRange(customer.value),
      flexibility: this.assessBudgetFlexibility(interactions),
      decisionMaker: this.identifyDecisionMaker(interactions),
      approvalStatus: this.assessApprovalStatus(interactions)
    };

    return budgetInfo;
  }

  estimateBudgetRange(value) {
    if (value > 5000000) return '₹50L - ₹1Cr+'; // ₹50L+ for enterprise
    if (value > 2500000) return '₹25L - ₹50L';
    if (value > 1000000) return '₹10L - ₹25L';
    return '₹5L - ₹10L';
  }

  assessBudgetFlexibility(interactions) {
    const notes = interactions.map(i => i.notes.toLowerCase());
    if (notes.some(note => note.includes('budget approved') || note.includes('funding secured'))) {
      return 'high';
    }
    if (notes.some(note => note.includes('budget') && note.includes('constraint'))) {
      return 'low';
    }
    if (notes.some(note => note.includes('limited') && note.includes('budget'))) {
      return 'low';
    }
    return 'medium';
  }

  assessApprovalStatus(interactions) {
    const notes = interactions.map(i => i.notes.toLowerCase());
    if (notes.some(note => note.includes('budget approved'))) {
      return 'approved';
    }
    if (notes.some(note => note.includes('decision by'))) {
      return 'pending';
    }
    if (notes.some(note => note.includes('funding secured'))) {
      return 'funded';
    }
    return 'unknown';
  }

  identifyDecisionMaker(interactions) {
    const notes = interactions.map(i => i.notes.toLowerCase());
    if (notes.some(note => note.includes('cto') || note.includes('ceo') || note.includes('vp'))) {
      return 'executive';
    }
    if (notes.some(note => note.includes('manager') || note.includes('director'))) {
      return 'management';
    }
    if (notes.some(note => note.includes('founder'))) {
      return 'founder';
    }
    return 'unknown';
  }

  analyzeTimeline(interactions) {
    const recentInteractions = interactions
      .filter(i => new Date(i.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (recentInteractions.length === 0) return 'unknown';
    
    const latest = recentInteractions[0];
    const notes = latest.notes.toLowerCase();
    
    if (notes.includes('urgent') || notes.includes('asap')) return 'immediate';
    if (notes.includes('q1') || notes.includes('q2')) return 'quarterly';
    if (notes.includes('next year') || notes.includes('2024')) return 'annual';
    if (notes.includes('end of q1') || notes.includes('decision by')) return 'specific';
    
    return 'flexible';
  }

  identifyRiskFactors(customer, interactions) {
    const risks = [];
    
    if (customer.status === 'inactive') {
      risks.push('Customer churn risk');
    }
    if (interactions.some(i => i.outcome === 'negative')) {
      risks.push('Negative interaction history');
    }
    if (interactions.length === 0) {
      risks.push('No recent engagement');
    }
    if (customer.value < 1000000) { // ₹10L threshold
      risks.push('Low value customer');
    }
    if (interactions.some(i => i.notes.toLowerCase().includes('competitor'))) {
      risks.push('Competitor consideration');
    }
    if (interactions.some(i => i.notes.toLowerCase().includes('budget constraint'))) {
      risks.push('Budget limitations');
    }
    if (customer.employees < 50 && customer.value > 2000000) { // ₹20L threshold
      risks.push('High value for small company');
    }

    return risks;
  }

  identifyOpportunities(customer, interactions) {
    const opportunities = [];
    
    if (customer.status === 'prospect' && customer.value > 2500000) { // ₹25L threshold
      opportunities.push('High-value prospect');
    }
    if (interactions.some(i => i.notes.toLowerCase().includes('expand') || i.notes.toLowerCase().includes('growth'))) {
      opportunities.push('Expansion opportunity');
    }
    if (customer.industry === 'Technology' || customer.industry === 'Financial Services') {
      opportunities.push('High-growth industry');
    }
    if (interactions.some(i => i.outcome === 'positive')) {
      opportunities.push('Positive relationship history');
    }
    if (interactions.some(i => i.notes.toLowerCase().includes('funding secured'))) {
      opportunities.push('Recently funded');
    }
    if (customer.employees > 100) {
      opportunities.push('Large organization potential');
    }
    if (interactions.some(i => i.notes.toLowerCase().includes('mobile') || i.notes.toLowerCase().includes('app'))) {
      opportunities.push('Mobile app opportunity');
    }
    if (interactions.some(i => i.notes.toLowerCase().includes('multi-location'))) {
      opportunities.push('Multi-location expansion');
    }

    return opportunities;
  }

  analyzeIndustrySpecifics(customer, interactions) {
    const insights = {
      industry: customer.industry,
      specificNeeds: [],
      compliance: [],
      trends: []
    };

    const notes = interactions.map(i => i.notes.toLowerCase());
    
    // Industry-specific analysis
    if (customer.industry === 'Healthcare') {
      insights.specificNeeds.push('HIPAA compliance');
      insights.specificNeeds.push('Patient data management');
      insights.compliance.push('HIPAA');
      insights.compliance.push('Data security');
    }
    
    if (customer.industry === 'Manufacturing') {
      insights.specificNeeds.push('Process automation');
      insights.specificNeeds.push('Inventory management');
      insights.trends.push('Industry 4.0 adoption');
    }
    
    if (customer.industry === 'Technology') {
      insights.specificNeeds.push('Scalable solutions');
      insights.specificNeeds.push('API integrations');
      insights.trends.push('Digital transformation');
    }
    
    if (customer.industry === 'Logistics') {
      insights.specificNeeds.push('Real-time tracking');
      insights.specificNeeds.push('Mobile access');
      insights.trends.push('Supply chain optimization');
    }
    
    if (customer.industry === 'Education') {
      insights.specificNeeds.push('Student data privacy');
      insights.specificNeeds.push('Analytics and reporting');
      insights.compliance.push('FERPA');
    }

    return insights;
  }

  assessEngagementLevel(interactions) {
    const recentInteractions = interactions.filter(i => 
      new Date(i.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    );
    
    if (recentInteractions.length === 0) return 'none';
    if (recentInteractions.length >= 3) return 'high';
    if (recentInteractions.length >= 1) return 'medium';
    
    return 'low';
  }

  generateSuggestions(analysis) {
    const suggestions = [];
    
    // Add pattern-based suggestions
    const patternSuggestions = this.getPatternSuggestions(analysis);
    suggestions.push(...patternSuggestions);
    
    // Add pain point specific suggestions
    const painPointSuggestions = this.getPainPointSuggestions(analysis.painPoints);
    suggestions.push(...painPointSuggestions);
    
    // Add opportunity-based suggestions
    const opportunitySuggestions = this.getOpportunitySuggestions(analysis.opportunities);
    suggestions.push(...opportunitySuggestions);
    
    // Add risk mitigation suggestions
    const riskSuggestions = this.getRiskMitigationSuggestions(analysis.riskFactors);
    suggestions.push(...riskSuggestions);

    // Add industry-specific suggestions
    const industrySuggestions = this.getIndustrySpecificSuggestions(analysis.industryInsights);
    suggestions.push(...industrySuggestions);

    return suggestions.slice(0, 6); // Limit to top 6 suggestions
  }

  getPatternSuggestions(analysis) {
    const suggestions = [];
    
    // Check against AI patterns
    Object.entries(aiSuggestions.patterns).forEach(([pattern, config]) => {
      const customerData = `${analysis.customerType} ${analysis.painPoints.join(' ')} ${analysis.interests.join(' ')} ${analysis.industryInsights?.industry || ''}`.toLowerCase();
      
      if (config.keywords.some(keyword => customerData.includes(keyword))) {
        suggestions.push(...config.suggestions);
      }
    });

    return suggestions;
  }

  getPainPointSuggestions(painPoints) {
    const suggestions = [];
    
    painPoints.forEach(painPoint => {
      if (painPoint.includes('efficiency')) {
        suggestions.push("Demonstrate ROI calculator showing time savings");
        suggestions.push("Share case study of similar efficiency improvements");
      }
      if (painPoint.includes('scale')) {
        suggestions.push("Show scalability features and growth path");
        suggestions.push("Discuss enterprise features for future growth");
      }
      if (painPoint.includes('implementation')) {
        suggestions.push("Present implementation timeline and support options");
        suggestions.push("Offer phased rollout approach");
      }
      if (painPoint.includes('compliance')) {
        suggestions.push("Highlight compliance features and certifications");
        suggestions.push("Discuss audit trails and security measures");
      }
      if (painPoint.includes('integration')) {
        suggestions.push("Show API documentation and integration examples");
        suggestions.push("Discuss pre-built integrations and custom options");
      }
      if (painPoint.includes('mobile')) {
        suggestions.push("Demonstrate mobile app features and capabilities");
        suggestions.push("Show offline functionality and sync options");
      }
    });

    return suggestions;
  }

  getOpportunitySuggestions(opportunities) {
    const suggestions = [];
    
    opportunities.forEach(opportunity => {
      if (opportunity.includes('high-value')) {
        suggestions.push("Focus on premium features and dedicated support");
        suggestions.push("Discuss enterprise package with custom solutions");
      }
      if (opportunity.includes('expansion')) {
        suggestions.push("Highlight multi-location management capabilities");
        suggestions.push("Discuss volume discounts for expansion");
      }
      if (opportunity.includes('high-growth')) {
        suggestions.push("Emphasize scalability and future-proofing");
        suggestions.push("Discuss industry-specific features and compliance");
      }
      if (opportunity.includes('funded')) {
        suggestions.push("Discuss growth-ready features and scaling options");
        suggestions.push("Show startup-friendly pricing and flexibility");
      }
      if (opportunity.includes('mobile')) {
        suggestions.push("Highlight mobile app development capabilities");
        suggestions.push("Show mobile-first features and user experience");
      }
    });

    return suggestions;
  }

  getRiskMitigationSuggestions(riskFactors) {
    const suggestions = [];
    
    riskFactors.forEach(risk => {
      if (risk.includes('churn')) {
        suggestions.push("Offer special re-engagement pricing");
        suggestions.push("Highlight new features since last contract");
      }
      if (risk.includes('negative')) {
        suggestions.push("Address previous concerns directly");
        suggestions.push("Offer additional support and training");
      }
      if (risk.includes('engagement')) {
        suggestions.push("Propose value-add consultation call");
        suggestions.push("Share relevant industry insights and trends");
      }
      if (risk.includes('competitor')) {
        suggestions.push("Highlight competitive advantages and unique features");
        suggestions.push("Show customer success stories and testimonials");
      }
      if (risk.includes('budget')) {
        suggestions.push("Discuss flexible pricing options and payment plans");
        suggestions.push("Show ROI and cost savings calculations");
      }
    });

    return suggestions;
  }

  getIndustrySpecificSuggestions(industryInsights) {
    const suggestions = [];
    
    if (!industryInsights) return suggestions;

    industryInsights.specificNeeds.forEach(need => {
      if (need.includes('HIPAA')) {
        suggestions.push("Emphasize HIPAA compliance and security features");
        suggestions.push("Show healthcare-specific case studies and testimonials");
      }
      if (need.includes('automation')) {
        suggestions.push("Demonstrate automation capabilities and time savings");
        suggestions.push("Share manufacturing efficiency case studies");
      }
      if (need.includes('scalable')) {
        suggestions.push("Show enterprise scalability and growth features");
        suggestions.push("Discuss API access and custom integration options");
      }
      if (need.includes('tracking')) {
        suggestions.push("Highlight real-time tracking and monitoring features");
        suggestions.push("Show mobile app capabilities for field operations");
      }
      if (need.includes('privacy')) {
        suggestions.push("Emphasize data privacy and security measures");
        suggestions.push("Show compliance documentation and certifications");
      }
    });

    return suggestions;
  }

  calculateConfidence(analysis) {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on data quality
    if (analysis.painPoints.length > 0) confidence += 0.1;
    if (analysis.interests.length > 0) confidence += 0.1;
    if (analysis.opportunities.length > 0) confidence += 0.1;
    if (analysis.riskFactors.length === 0) confidence += 0.1;
    if (analysis.customerType !== 'standard') confidence += 0.1;
    if (analysis.engagementLevel === 'high') confidence += 0.1;
    if (analysis.budget.approvalStatus === 'approved') confidence += 0.1;
    if (analysis.industryInsights.specificNeeds.length > 0) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  getDefaultSuggestions() {
    return {
      customer: null,
      analysis: null,
      suggestions: [
        "Focus on understanding their current challenges and pain points",
        "Ask about their business goals and growth plans",
        "Discuss how our solution can address their specific needs",
        "Share relevant case studies from their industry",
        "Explore their decision-making process and timeline",
        "Demonstrate key features that align with their industry"
      ],
      confidence: 0.3
    };
  }
}

export default new AIService(); 