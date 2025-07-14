export const customers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@techcorp.com",
    company: "TechCorp Solutions",
    phone: "+91 98765-43210",
    status: "active",
    value: 4150000, // $50,000 = ₹41,50,000 (1 USD = 83 INR)
    lastContact: "2024-01-15",
    industry: "Technology",
    location: "Mumbai, Maharashtra",
    notes: "Interested in enterprise solutions, has budget approved for Q2. Team growing from 50 to 75 employees. Looking for scalable CRM with advanced analytics.",
    website: "https://techcorp-solutions.com",
    founded: 2018,
    employees: 75,
    revenue: "₹83Cr - ₹415Cr" // $10M - $50M = ₹83Cr - ₹415Cr
  },
  {
    id: 2,
    name: "Arjun Patel",
    email: "arjun.patel@innovateinc.com",
    company: "Innovate Inc",
    phone: "+91 98765-43211",
    status: "prospect",
    value: 2075000, // $25,000 = ₹20,75,000
    lastContact: "2024-01-10",
    industry: "Manufacturing",
    location: "Pune, Maharashtra",
    notes: "Looking for automation solutions, decision maker. Currently using manual processes losing 3 hours daily. Budget: ₹20L-25L. Interested in ROI demonstration.",
    website: "https://innovate-inc.com",
    founded: 2015,
    employees: 120,
    revenue: "₹41.5Cr - ₹83Cr" // $5M - $10M = ₹41.5Cr - ₹83Cr
  },
  {
    id: 3,
    name: "Anjali Reddy",
    email: "anjali.reddy@healthcareplus.com",
    company: "Healthcare Plus",
    phone: "+91 98765-43212",
    status: "active",
    value: 6225000, // $75,000 = ₹62,25,000
    lastContact: "2024-01-12",
    industry: "Healthcare",
    location: "Bangalore, Karnataka",
    notes: "Expanding to new locations, needs scalable solution. Opening 3 new clinics in Q2. Concerned about HIPAA compliance and implementation timeline.",
    website: "https://healthcare-plus.com",
    founded: 2010,
    employees: 250,
    revenue: "₹415Cr - ₹830Cr" // $50M - $100M = ₹415Cr - ₹830Cr
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@retailchain.com",
    company: "Retail Chain Corp",
    phone: "+91 98765-43213",
    status: "inactive",
    value: 1245000, // $15,000 = ₹12,45,000
    lastContact: "2023-12-20",
    industry: "Retail",
    location: "Delhi, NCR",
    notes: "Previous customer, may need re-engagement. Contract expired due to budget cuts. Was satisfied with product but couldn't justify cost during restructuring.",
    website: "https://retail-chain.com",
    founded: 2008,
    employees: 85,
    revenue: "₹83Cr - ₹415Cr" // $10M - $50M = ₹83Cr - ₹415Cr
  },
  {
    id: 5,
    name: "Lakshmi Iyer",
    email: "lakshmi.iyer@fintechstartup.com",
    company: "FinTech Startup",
    phone: "+91 98765-43214",
    status: "prospect",
    value: 2905000, // $35,000 = ₹29,05,000
    lastContact: "2024-01-08",
    industry: "Financial Services",
    location: "Hyderabad, Telangana",
    notes: "Series A funding secured, ready to invest in tools. CTO is decision maker. Need CRM and analytics tools to scale operations. Fast-moving environment.",
    website: "https://fintech-startup.com",
    founded: 2022,
    employees: 25,
    revenue: "₹8.3Cr - ₹41.5Cr" // $1M - $5M = ₹8.3Cr - ₹41.5Cr
  },
  {
    id: 6,
    name: "Rahul Mehta",
    email: "rahul.mehta@logisticspro.com",
    company: "Logistics Pro",
    phone: "+91 98765-43215",
    status: "active",
    value: 3735000, // $45,000 = ₹37,35,000
    lastContact: "2024-01-14",
    industry: "Logistics",
    location: "Chennai, Tamil Nadu",
    notes: "Growing logistics company with 15 warehouses. Need real-time tracking and inventory management. Interested in mobile app capabilities.",
    website: "https://logistics-pro.com",
    founded: 2012,
    employees: 180,
    revenue: "₹83Cr - ₹415Cr" // $10M - $50M = ₹83Cr - ₹415Cr
  },
  {
    id: 7,
    name: "Kavya Nair",
    email: "kavya.nair@edutech.com",
    company: "EduTech Solutions",
    phone: "+91 98765-43216",
    status: "prospect",
    value: 1660000, // $20,000 = ₹16,60,000
    lastContact: "2024-01-09",
    industry: "Education",
    location: "Kolkata, West Bengal",
    notes: "Educational technology startup. Need student management system with analytics. Budget limited but potential for growth. Decision by end of Q1.",
    website: "https://edutech-solutions.com",
    founded: 2021,
    employees: 15,
    revenue: "₹8.3Cr - ₹41.5Cr" // $1M - $5M = ₹8.3Cr - ₹41.5Cr
  },
  {
    id: 8,
    name: "Suresh Verma",
    email: "suresh.verma@constructionco.com",
    company: "Construction Co",
    phone: "+91 98765-43217",
    status: "inactive",
    value: 664000, // $8,000 = ₹6,64,000
    lastContact: "2023-11-15",
    industry: "Construction",
    location: "Ahmedabad, Gujarat",
    notes: "Small construction company. Previous customer but switched to competitor due to pricing. May be open to return with better offer.",
    website: "https://construction-co.com",
    founded: 2016,
    employees: 45,
    revenue: "₹41.5Cr - ₹83Cr" // $5M - $10M = ₹41.5Cr - ₹83Cr
  }
];

export const interactions = [
  // Priya Sharma - TechCorp Solutions (Enterprise Customer)
  {
    id: 1,
    customerId: 1,
    type: "call",
    date: "2024-01-15",
    duration: 45,
    notes: "Discussed enterprise package options. Priya showed interest in the premium tier with custom integrations. Mentioned they're planning to scale their team by 50% this year. Asked about API access and third-party integrations. Very technical conversation about implementation details.",
    outcome: "positive",
    followUp: "2024-01-22"
  },
  {
    id: 2,
    customerId: 1,
    type: "email",
    date: "2024-01-12",
    notes: "Sent proposal for enterprise solution. Priya responded asking about implementation timeline and training options. Also inquired about dedicated account management and priority support features.",
    outcome: "neutral",
    followUp: "2024-01-19"
  },
  {
    id: 3,
    customerId: 1,
    type: "meeting",
    date: "2024-01-08",
    duration: 90,
    notes: "Initial discovery meeting. Priya is VP of Operations. TechCorp is growing rapidly and needs a scalable solution. Discussed current pain points: manual data entry, lack of analytics, poor customer tracking. Budget approved for Q2 implementation.",
    outcome: "positive",
    followUp: "2024-01-15"
  },
  {
    id: 4,
    customerId: 1,
    type: "call",
    date: "2023-12-20",
    duration: 30,
    notes: "Follow-up on initial contact. Priya was busy but showed interest. Asked for more information about enterprise features and security compliance.",
    outcome: "neutral",
    followUp: "2024-01-08"
  },

  // Arjun Patel - Innovate Inc (Manufacturing Prospect)
  {
    id: 5,
    customerId: 2,
    type: "meeting",
    date: "2024-01-10",
    duration: 60,
    notes: "Initial discovery meeting. Arjun is looking to automate their manufacturing processes. They're currently using manual systems and losing efficiency. Budget: ₹20L-25L. Very interested in ROI demonstration and case studies.",
    outcome: "positive",
    followUp: "2024-01-17"
  },
  {
    id: 6,
    customerId: 2,
    type: "email",
    date: "2024-01-05",
    notes: "Sent initial information about automation solutions. Arjun responded asking for specific examples of time savings and efficiency improvements.",
    outcome: "neutral",
    followUp: "2024-01-10"
  },
  {
    id: 7,
    customerId: 2,
    type: "call",
    date: "2023-12-28",
    duration: 20,
    notes: "First contact. Arjun is the Operations Manager. They're struggling with manual inventory tracking and production scheduling. Looking for solutions to reduce errors and save time.",
    outcome: "positive",
    followUp: "2024-01-05"
  },

  // Anjali Reddy - Healthcare Plus (Expansion Customer)
  {
    id: 8,
    customerId: 3,
    type: "call",
    date: "2024-01-12",
    duration: 30,
    notes: "Follow-up on previous proposal. Anjali mentioned they're opening 3 new locations and need a solution that can scale quickly. Concerned about implementation time and HIPAA compliance. Very interested in multi-location management.",
    outcome: "positive",
    followUp: "2024-01-19"
  },
  {
    id: 9,
    customerId: 3,
    type: "meeting",
    date: "2024-01-05",
    duration: 75,
    notes: "Detailed proposal presentation. Anjali is the IT Director. Healthcare Plus is expanding rapidly and needs a HIPAA-compliant solution. Discussed security features, audit trails, and centralized administration. Budget approved for implementation.",
    outcome: "positive",
    followUp: "2024-01-12"
  },
  {
    id: 10,
    customerId: 3,
    type: "email",
    date: "2023-12-15",
    notes: "Sent proposal for healthcare solution. Anjali responded with questions about HIPAA compliance and data security features. Also asked about training requirements for staff.",
    outcome: "neutral",
    followUp: "2024-01-05"
  },
  {
    id: 11,
    customerId: 3,
    type: "call",
    date: "2023-12-01",
    duration: 45,
    notes: "Initial discovery call. Anjali is looking for a solution to manage patient data across multiple locations. Current system is outdated and doesn't support their growth plans.",
    outcome: "positive",
    followUp: "2023-12-15"
  },

  // Rajesh Kumar - Retail Chain Corp (Inactive Customer)
  {
    id: 12,
    customerId: 4,
    type: "email",
    date: "2023-12-20",
    notes: "Sent renewal reminder. No response received. Previous contract expired due to budget cuts. Customer was satisfied with product but couldn't justify cost during company restructuring.",
    outcome: "negative",
    followUp: "2024-01-20"
  },
  {
    id: 13,
    customerId: 4,
    type: "call",
    date: "2023-11-15",
    duration: 25,
    notes: "Renewal discussion. Rajesh mentioned budget constraints due to company restructuring. Was happy with the product but couldn't justify the cost. Said they might reconsider in 6 months.",
    outcome: "negative",
    followUp: "2023-12-20"
  },
  {
    id: 14,
    customerId: 4,
    type: "meeting",
    date: "2023-10-20",
    duration: 60,
    notes: "Quarterly review meeting. Rajesh was satisfied with the product and mentioned it helped improve their customer service. No major issues reported.",
    outcome: "positive",
    followUp: "2023-11-15"
  },
  {
    id: 15,
    customerId: 4,
    type: "call",
    date: "2023-09-15",
    duration: 30,
    notes: "Follow-up call. Rajesh reported good results with the implementation. Customer satisfaction scores improved by 15%. No issues to report.",
    outcome: "positive",
    followUp: "2023-10-20"
  },

  // Lakshmi Iyer - FinTech Startup (Startup Prospect)
  {
    id: 16,
    customerId: 5,
    type: "call",
    date: "2024-01-08",
    duration: 25,
    notes: "Initial contact. Lakshmi is the CTO of a fintech startup that just secured Series A funding. They need CRM and analytics tools to scale their operations. Fast-moving environment, need quick implementation.",
    outcome: "positive",
    followUp: "2024-01-15"
  },
  {
    id: 17,
    customerId: 5,
    type: "email",
    date: "2024-01-03",
    notes: "Sent information about startup-friendly solutions. Lakshmi responded asking about pricing for small teams and integration capabilities with their existing tools.",
    outcome: "neutral",
    followUp: "2024-01-08"
  },

  // Rahul Mehta - Logistics Pro (Active Customer)
  {
    id: 18,
    customerId: 6,
    type: "call",
    date: "2024-01-14",
    duration: 40,
    notes: "Follow-up on implementation. Rahul is very satisfied with the real-time tracking features. Asked about mobile app capabilities for warehouse staff. Interested in expanding to all 15 locations.",
    outcome: "positive",
    followUp: "2024-01-21"
  },
  {
    id: 19,
    customerId: 6,
    type: "meeting",
    date: "2024-01-07",
    duration: 90,
    notes: "Implementation planning meeting. Rahul is the Operations Director. Logistics Pro has 15 warehouses and needs real-time inventory tracking. Discussed mobile app requirements and integration with existing systems.",
    outcome: "positive",
    followUp: "2024-01-14"
  },
  {
    id: 20,
    customerId: 6,
    type: "call",
    date: "2023-12-10",
    duration: 35,
    notes: "Initial discovery call. Rahul mentioned they're struggling with inventory management across multiple locations. Need a solution that can handle real-time updates and mobile access.",
    outcome: "positive",
    followUp: "2024-01-07"
  },

  // Kavya Nair - EduTech Solutions (Education Prospect)
  {
    id: 21,
    customerId: 7,
    type: "call",
    date: "2024-01-09",
    duration: 30,
    notes: "Initial contact. Kavya is the founder of an educational technology startup. Need student management system with analytics. Budget limited but potential for growth. Decision by end of Q1.",
    outcome: "positive",
    followUp: "2024-01-16"
  },
  {
    id: 22,
    customerId: 7,
    type: "email",
    date: "2024-01-02",
    notes: "Sent information about education-specific solutions. Kavya responded asking about pricing for small educational institutions and student data privacy features.",
    outcome: "neutral",
    followUp: "2024-01-09"
  },

  // Suresh Verma - Construction Co (Inactive Customer)
  {
    id: 23,
    customerId: 8,
    type: "call",
    date: "2023-11-15",
    duration: 20,
    notes: "Renewal discussion. Suresh mentioned they switched to a competitor due to pricing. Was satisfied with our product but couldn't justify the cost. May be open to return with better offer.",
    outcome: "negative",
    followUp: "2023-12-15"
  },
  {
    id: 24,
    customerId: 8,
    type: "meeting",
    date: "2023-10-05",
    duration: 45,
    notes: "Quarterly review. Suresh was satisfied with the project management features. Helped them track multiple construction projects more efficiently. No major issues reported.",
    outcome: "positive",
    followUp: "2023-11-15"
  },
  {
    id: 25,
    customerId: 8,
    type: "call",
    date: "2023-09-01",
    duration: 25,
    notes: "Follow-up call. Suresh reported good results with the implementation. Project completion times improved by 20%. Very satisfied with the product.",
    outcome: "positive",
    followUp: "2023-10-05"
  }
];

export const aiSuggestions = {
  // AI suggestion patterns based on customer history
  patterns: {
    enterprise: {
      keywords: ["enterprise", "premium", "custom", "integration", "scale", "api", "dedicated"],
      suggestions: [
        "Highlight enterprise-grade security and compliance features",
        "Discuss custom integration capabilities and API access",
        "Mention dedicated account management and priority support",
        "Emphasize scalability for growing teams",
        "Show enterprise pricing tiers and ROI calculator"
      ]
    },
    automation: {
      keywords: ["automation", "manual", "efficiency", "process", "roi", "time savings"],
      suggestions: [
        "Focus on time-saving automation features",
        "Discuss ROI and efficiency improvements",
        "Mention case studies of similar manufacturing clients",
        "Highlight easy implementation and training",
        "Demonstrate specific time savings calculations"
      ]
    },
    expansion: {
      keywords: ["expand", "new locations", "scale", "growth", "multi-location", "centralized"],
      suggestions: [
        "Emphasize multi-location management capabilities",
        "Discuss centralized administration features",
        "Mention rapid deployment options",
        "Highlight cost savings across locations",
        "Show scalability for future growth"
      ]
    },
    reengagement: {
      keywords: ["previous", "expired", "renewal", "inactive", "competitor", "pricing"],
      suggestions: [
        "Acknowledge previous relationship and value provided",
        "Discuss new features and improvements since last contract",
        "Offer special re-engagement pricing",
        "Highlight success stories from similar re-engaged clients",
        "Address previous concerns about pricing"
      ]
    },
    startup: {
      keywords: ["startup", "funding", "scale", "growth", "fast-moving", "quick implementation"],
      suggestions: [
        "Focus on cost-effective solutions for growing companies",
        "Discuss flexible pricing and scaling options",
        "Mention startup-friendly features and integrations",
        "Highlight quick implementation for fast-moving teams",
        "Show growth path and upgrade options"
      ]
    },
    healthcare: {
      keywords: ["healthcare", "hipaa", "compliance", "security", "patient", "audit"],
      suggestions: [
        "Emphasize HIPAA compliance and security features",
        "Discuss audit trails and data protection",
        "Mention healthcare-specific case studies",
        "Highlight multi-location patient management",
        "Show compliance documentation and certifications"
      ]
    },
    logistics: {
      keywords: ["logistics", "warehouse", "inventory", "tracking", "mobile", "real-time"],
      suggestions: [
        "Focus on real-time inventory tracking capabilities",
        "Discuss mobile app features for warehouse staff",
        "Mention multi-location inventory management",
        "Highlight integration with existing logistics systems",
        "Show efficiency improvements and cost savings"
      ]
    },
    education: {
      keywords: ["education", "student", "privacy", "analytics", "small", "budget"],
      suggestions: [
        "Emphasize student data privacy and security",
        "Discuss education-specific analytics and reporting",
        "Mention pricing for small educational institutions",
        "Highlight easy student management features",
        "Show growth path for expanding institutions"
      ]
    }
  }
}; 