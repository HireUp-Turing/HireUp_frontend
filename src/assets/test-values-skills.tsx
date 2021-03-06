export const skillsData = [
  'rails', 
  'communication', 
  'critical thinking', 
  'problem solving', 
  'public speaking',
  'customer service',
  'teamwork',
  'active listening',
  'adaptability',
  'negotiation',
  'conflict resolution',
  'empathy',
  'decision making',
  'management',
  'leadership',
  'organization',
  'foreign languages',
  'social media',
  'teaching',
  'design',
  'project management',
  'computer technology',
  'accounting',
  'business & data analysis',
  'nursing',
  'economics',
  'automotive services',
  'SEO/SEM marketing',
  'cloud and distributed',
  'data presentation'
].map((skill, i) => (
	{ attribute: skill, id: i }
))

export const valuesData = [
  //team values
  'engages with community',
  'team is diverse',
  'continuous feedback',
  'impressive team members',
  'bonded by love for product',
  'creative & innovative',
  'cross-department collaboration',
  'open communication',
  'eq > iq',
  'flat organization',
  'risk-taking > stability',
  'wears many hats',
  'heavily team oriented',
  //career growth
  'promotes from within',
  'internal mobility',
  'good for juniors',
  'has internships',
  'high employee retention',
  //personal health
  'actively practices inclusion',
  'work/life balance',
  'committed to personal growth',
  'ideal for parents',
  'safe environment to fail',
  'supports physical wellness',
  'fosters psychological',
  //daily routines
  'eats lunch together',
  'flexible work arrangements',
  'light meetings',
  'friends outside of work',
  'has good beer',
  'thoughtful office layout',
  //strategy
  'customer first',
  'engineering-driven',
  'product-driven',
  'design-driven',
  'data-driven',
  'rapidly growing team',
  // company properties
  'B2B',
  'B2C',
  'self-funded',
  'technical founder(s)',
  'PBC / B-CORP'
].map((value, i) => (
	{ attribute: value, id: i }
))