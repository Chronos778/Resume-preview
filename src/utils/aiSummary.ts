/**
 * AI Summary Generator Utility
 * Generates professional resume summaries based on user input
 * Currently uses mock responses; can be connected to real AI API
 */

// Template summaries for different experience levels and roles
const summaryTemplates = {
  'entry-level': [
    "Motivated {role} with a strong foundation in {skills}. Eager to apply academic knowledge and recent project experience to contribute to innovative teams. Quick learner with excellent problem-solving abilities and a passion for continuous growth.",
    "Recent graduate and aspiring {role} with hands-on experience in {skills}. Committed to delivering high-quality work and learning from experienced professionals. Strong communicator with a collaborative mindset.",
    "Enthusiastic {role} seeking to leverage skills in {skills} to drive impactful solutions. Demonstrated ability to quickly adapt to new technologies and contribute meaningfully to team projects.",
  ],
  'mid-level': [
    "Results-driven {role} with proven expertise in {skills}. Experienced in delivering scalable solutions and collaborating with cross-functional teams. Passionate about writing clean, maintainable code and mentoring junior developers.",
    "Versatile {role} bringing solid experience with {skills}. Track record of successfully delivering projects on time while maintaining high code quality. Strong advocate for best practices and continuous improvement.",
    "Detail-oriented {role} skilled in {skills}. Known for translating complex requirements into elegant technical solutions. Committed to staying current with industry trends and emerging technologies.",
  ],
  'senior': [
    "Seasoned {role} with extensive expertise in {skills}. Proven track record of architecting scalable systems and leading high-performing teams. Strategic thinker who balances technical excellence with business objectives.",
    "Accomplished {role} bringing deep knowledge of {skills}. Expert in designing robust architectures and driving technical decisions that impact organizational success. Dedicated mentor committed to team growth and knowledge sharing.",
    "Distinguished {role} with comprehensive experience in {skills}. History of delivering mission-critical systems and fostering engineering excellence. Skilled at bridging technical and business stakeholders to achieve common goals.",
  ],
};

// Fallback role-specific additions
const roleAdditions: Record<string, string> = {
  'developer': 'Passionate about building user-centric applications and optimizing performance.',
  'engineer': 'Committed to engineering excellence and solving complex technical challenges.',
  'designer': 'Eye for detail with a focus on creating intuitive and visually appealing experiences.',
  'manager': 'Strong leadership skills with experience in agile methodologies and team coordination.',
  'analyst': 'Analytical mindset with expertise in data-driven decision making.',
  'default': 'Dedicated professional committed to delivering exceptional results.',
};

/**
 * Simulates AI delay for realistic UX
 */
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a professional summary based on role, skills, and experience level
 */
export async function generateAISummary(
  role: string,
  skills: string[],
  experienceLevel: 'entry-level' | 'mid-level' | 'senior'
): Promise<string> {
  // Simulate API delay
  await simulateDelay(1500 + Math.random() * 1000);

  // Get appropriate templates
  const templates = summaryTemplates[experienceLevel];
  const template = templates[Math.floor(Math.random() * templates.length)];

  // Format role (use provided or generic)
  const formattedRole = role || 'professional';

  // Format skills (join top 5 skills or use generic)
  const formattedSkills = skills.length > 0
    ? skills.slice(0, 5).join(', ')
    : 'modern technologies';

  // Replace placeholders
  let summary = template
    .replace('{role}', formattedRole)
    .replace('{skills}', formattedSkills);

  // Add role-specific addition
  const roleLower = role.toLowerCase();
  let addition = roleAdditions['default'];
  for (const [key, value] of Object.entries(roleAdditions)) {
    if (roleLower.includes(key)) {
      addition = value;
      break;
    }
  }

  summary = `${summary} ${addition}`;

  return summary;
}

/**
 * Generates keywords based on the role
 */
export function generateKeywords(role: string): string[] {
  const roleKeywords: Record<string, string[]> = {
    'developer': ['problem-solving', 'agile', 'code quality', 'testing', 'debugging'],
    'engineer': ['system design', 'optimization', 'scalability', 'architecture', 'performance'],
    'designer': ['user research', 'prototyping', 'visual design', 'accessibility', 'design systems'],
    'manager': ['leadership', 'stakeholder management', 'project delivery', 'team building', 'strategy'],
    'analyst': ['data analysis', 'reporting', 'insights', 'visualization', 'forecasting'],
  };

  const roleLower = role.toLowerCase();
  for (const [key, keywords] of Object.entries(roleKeywords)) {
    if (roleLower.includes(key)) {
      return keywords;
    }
  }

  return ['communication', 'teamwork', 'adaptability', 'critical thinking', 'attention to detail'];
}
