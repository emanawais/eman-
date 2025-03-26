// js/data.js

/**
 * Supervisor Data Module
 * Contains comprehensive information about available supervisors
 */

export const supervisors = [
  {
    id: "SUP-2023-001",
    name: "Dr. Ali Khan",
    title: "Associate Professor",
    department: "Computer Science",
    researchDomain: "Artificial Intelligence",
    specialization: ["Machine Learning", "Neural Networks"],
    availableSlots: 3,
    maxSlots: 5,
    contactInfo: {
      email: "ali.khan@university.edu",
      phone: "+92 300 1234567",
      office: "CS Building, Room 402"
    },
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Specialized in deep learning applications for computer vision with 10+ years of research experience.",
    rating: 4.8,
    projects: [
      "AI for Medical Diagnosis",
      "Autonomous Vehicle Navigation"
    ],
    requirements: "Strong Python skills, familiarity with TensorFlow/PyTorch",
    isAvailable: true
  },
  {
    id: "SUP-2023-002",
    name: "Dr. Sara Ahmed",
    title: "Assistant Professor",
    department: "Data Science",
    researchDomain: "Data Science",
    specialization: ["Big Data Analytics", "Data Mining"],
    availableSlots: 0,
    maxSlots: 3,
    contactInfo: {
      email: "sara.ahmed@university.edu",
      phone: "+92 300 7654321",
      office: "DS Building, Room 205"
    },
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Focuses on scalable data processing algorithms and predictive modeling.",
    rating: 4.5,
    projects: [
      "Real-time Traffic Pattern Analysis",
      "Healthcare Data Warehousing"
    ],
    requirements: "SQL, Python/R, Spark experience preferred",
    isAvailable: false
  },
  {
    id: "SUP-2023-003",
    name: "Dr. John Smith",
    title: "Professor",
    department: "Computer Science",
    researchDomain: "Machine Learning",
    specialization: ["Reinforcement Learning", "Natural Language Processing"],
    availableSlots: 2,
    maxSlots: 4,
    contactInfo: {
      email: "john.smith@university.edu",
      phone: "+92 300 1122334",
      office: "CS Building, Room 301"
    },
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Leading researcher in NLP with publications in top-tier conferences.",
    rating: 4.9,
    projects: [
      "Multilingual Chatbots",
      "Sentiment Analysis for Social Media"
    ],
    requirements: "Background in linguistics or statistics beneficial",
    isAvailable: true
  },
  {
    id: "SUP-2023-004",
    name: "Dr. Emily Brown",
    title: "Associate Professor",
    department: "Cyber Security",
    researchDomain: "Cybersecurity",
    specialization: ["Network Security", "Cryptography"],
    availableSlots: 1,
    maxSlots: 2,
    contactInfo: {
      email: "emily.brown@university.edu",
      phone: "+92 300 5566778",
      office: "SEC Building, Room 101"
    },
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Expert in cryptographic protocols and secure system design.",
    rating: 4.7,
    projects: [
      "Blockchain Security",
      "IoT Device Authentication"
    ],
    requirements: "Understanding of networking protocols required",
    isAvailable: true
  },
  {
    id: "SUP-2023-005",
    name: "Dr. Michael Johnson",
    title: "Professor",
    department: "Software Engineering",
    researchDomain: "Software Engineering",
    specialization: ["Agile Development", "Software Architecture"],
    availableSlots: 4,
    maxSlots: 6,
    contactInfo: {
      email: "michael.johnson@university.edu",
      phone: "+92 300 9988776",
      office: "ENG Building, Room 210"
    },
    profileImage: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Focuses on software quality metrics and development methodologies.",
    rating: 4.6,
    projects: [
      "Automated Code Review Systems",
      "CI/CD Optimization"
    ],
    requirements: "Experience with Java/C# and software design patterns",
    isAvailable: true
  },
  {
    id: "SUP-2023-006",
    name: "Dr. Sarah Lee",
    title: "Assistant Professor",
    department: "Human-Computer Interaction",
    researchDomain: "Human-Computer Interaction",
    specialization: ["UX Design", "Accessibility"],
    availableSlots: 2,
    maxSlots: 3,
    contactInfo: {
      email: "sarah.lee@university.edu",
      phone: "+92 300 4433221",
      office: "HCI Lab, Room 15"
    },
    profileImage: "https://randomuser.me/api/portraits/women/29.jpg",
    bio: "Specializes in inclusive design and user experience research.",
    rating: 4.4,
    projects: [
      "AR/VR Interfaces",
      "Accessible Web Design"
    ],
    requirements: "Background in psychology or design helpful",
    isAvailable: true
  },
  {
    id: "SUP-2023-007",
    name: "Dr. David Wilson",
    title: "Associate Professor",
    department: "Cloud Computing",
    researchDomain: "Cloud Computing",
    specialization: ["Distributed Systems", "Serverless Architecture"],
    availableSlots: 3,
    maxSlots: 5,
    contactInfo: {
      email: "david.wilson@university.edu",
      phone: "+92 300 7788990",
      office: "CLD Building, Room 312"
    },
    profileImage: "https://randomuser.me/api/portraits/men/63.jpg",
    bio: "Researcher in cloud resource optimization and serverless computing.",
    rating: 4.7,
    projects: [
      "Auto-scaling Algorithms",
      "Multi-cloud Deployment"
    ],
    requirements: "Experience with AWS/Azure/GCP",
    isAvailable: true
  },
  {
    id: "SUP-2023-008",
    name: "Dr. Laura Martinez",
    title: "Professor",
    department: "Natural Language Processing",
    researchDomain: "Natural Language Processing",
    specialization: ["Text Mining", "Speech Recognition"],
    availableSlots: 1,
    maxSlots: 2,
    contactInfo: {
      email: "laura.martinez@university.edu",
      phone: "+92 300 6677889",
      office: "NLP Lab, Room 108"
    },
    profileImage: "https://randomuser.me/api/portraits/women/51.jpg",
    bio: "Pioneer in multilingual NLP systems and speech-to-text technologies.",
    rating: 4.9,
    projects: [
      "Low-resource Language Processing",
      "Contextual Speech Understanding"
    ],
    requirements: "Python, NLP libraries experience",
    isAvailable: true
  },
  {
    id: "SUP-2023-009",
    name: "Dr. James Anderson",
    title: "Assistant Professor",
    department: "Computer Vision",
    researchDomain: "Computer Vision",
    specialization: ["Image Processing", "Object Detection"],
    availableSlots: 0,
    maxSlots: 2,
    contactInfo: {
      email: "james.anderson@university.edu",
      phone: "+92 300 3344556",
      office: "CV Lab, Room 207"
    },
    profileImage: "https://randomuser.me/api/portraits/men/47.jpg",
    bio: "Focuses on real-time image analysis and medical imaging applications.",
    rating: 4.6,
    projects: [
      "Automated Radiology Analysis",
      "Surveillance System Enhancement"
    ],
    requirements: "OpenCV/PyTorch experience preferred",
    isAvailable: false
  },
  {
    id: "SUP-2023-010",
    name: "Dr. Olivia Taylor",
    title: "Associate Professor",
    department: "Blockchain Technology",
    researchDomain: "Blockchain Technology",
    specialization: ["Smart Contracts", "Decentralized Finance"],
    availableSlots: 2,
    maxSlots: 4,
    contactInfo: {
      email: "olivia.taylor@university.edu",
      phone: "+92 300 1239876",
      office: "BLK Building, Room 305"
    },
    profileImage: "https://randomuser.me/api/portraits/women/37.jpg",
    bio: "Expert in blockchain scalability solutions and DeFi applications.",
    rating: 4.8,
    projects: [
      "Cross-chain Interoperability",
      "NFT Authentication Systems"
    ],
    requirements: "Solidity/Ethereum knowledge beneficial",
    isAvailable: true
  }
];

// Additional utility data
export const researchDomains = [
  "Artificial Intelligence",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Software Engineering",
  "Human-Computer Interaction",
  "Cloud Computing",
  "Natural Language Processing",
  "Computer Vision",
  "Blockchain Technology"
];

export const departments = [
  "Computer Science",
  "Data Science",
  "Cyber Security",
  "Software Engineering",
  "Human-Computer Interaction",
  "Cloud Computing",
  "Natural Language Processing",
  "Computer Vision",
  "Blockchain Technology"
];