export const tabs = [
  'My Profile',
  'Memo',
  'Calendar',
  'Leave Applications',
  'Paystub',
  'Timesheet',
  'Earnings',
  'Appraisals',
  'Expense Claims',
  'Loans & Advances',
  'Files',
  'Cases',
];

export const selfAppraisal = {
  name: 'Jane Smith',
  role: 'Marketing Manager',
  rating: 4.5,
  avatar: 'JS',
  tone: 'blue',
  email: 'jane.smith@fowgate.com',
  department: 'Marketing',
  manager: 'Noah Jenkins',
  location: 'Lagos, Nigeria',
};

export const teamMembers = [
  { name: 'Samuel Adeyemi', role: 'Chief Marketing Officer', rating: 4.1, avatar: 'SA', tone: 'gold', email: 'samuel.adeyemi@fowgate.com', department: 'Marketing', manager: 'Jane Smith', location: 'Lagos, Nigeria' },
  { name: 'Grace Nwosu', role: 'Marketing Manager', rating: 4.5, avatar: 'GN', tone: 'rose', email: 'grace.nwosu@fowgate.com', department: 'Marketing', manager: 'Noah Jenkins', location: 'Lagos, Nigeria' },
  { name: 'Scott Pippen', role: 'Marketing Director', rating: 4.5, avatar: 'SP', tone: 'stone', email: 'scott.pippen@fowgate.com', department: 'Marketing', manager: 'Noah Jenkins', location: 'Lagos, Nigeria' },
  { name: 'Mary Adkins', role: 'Brand Manager', rating: 4.5, avatar: 'MA', tone: 'pink', email: 'mary.adkins@fowgate.com', department: 'Brand', manager: 'Jane Smith', location: 'Lagos, Nigeria' },
  { name: 'Olawale Michael', role: 'Sales Marketer', rating: 3.5, avatar: 'OM', tone: 'teal', email: 'olawale.michael@fowgate.com', department: 'Sales', manager: 'Jane Smith', location: 'Lagos, Nigeria' },
];

export const criteria = [
  'Improvement in certain areas',
  'Understanding of the role',
  'Professional growth and initiative',
  'Quality of communication',
];

export const loanPurposes = [
  'Medical',
  'Education',
  'Personal',
  'Buying Assets',
  'Business And Investment',
  'Debt consolidation',
  'Build Credit History',
];

export const currencyOptions = [
  { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
];

export const reportSections = [
  {
    title: 'Team Appraisal',
    rating: 4.0,
    rows: [
      { label: 'Takes responsibility of his actions', rating: 3.0 },
      { label: "Listens to colleagues and accepts other's ideas", rating: 4.0 },
      { label: 'Takes ownership of tasks', rating: 5.0 },
    ],
  },
  {
    title: "Line Manager's Appraisal",
    rating: 4.0,
    rows: [
      { label: 'Follows company rules, regulation and procedures', rating: 4.0 },
      { label: 'Communicates precisely and gets what is needed', rating: 3.0 },
      { label: 'Has good work ethics', rating: 4.0 },
      { label: 'Helps colleagues whenever needed', rating: 5.0 },
    ],
  },
  {
    title: 'Self Appraisal',
    rating: 4.5,
    rows: [
      { label: 'Improvement in certain areas', rating: 5.0 },
    ],
  },
];
