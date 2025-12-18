/**
 * AI Summary Generator Utility
 * Generates professional resume summaries using Google Gemini AI
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const getGeminiAPI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Gemini API key not found, using fallback templates');
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

// Fallback templates for when API is unavailable
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

const roleAdditions: Record<string, string> = {
  'developer': 'Passionate about building user-centric applications and optimizing performance.',
  'engineer': 'Committed to engineering excellence and solving complex technical challenges.',
  'designer': 'Eye for detail with a focus on creating intuitive and visually appealing experiences.',
  'manager': 'Strong leadership skills with experience in agile methodologies and team coordination.',
  'analyst': 'Analytical mindset with expertise in data-driven decision making.',
  'default': 'Dedicated professional committed to delivering exceptional results.',
};

/**
 * Generates fallback summary using templates
 */
function generateFallbackSummary(
  role: string,
  skills: string[],
  experienceLevel: 'entry-level' | 'mid-level' | 'senior'
): string {
  const templates = summaryTemplates[experienceLevel];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const formattedRole = role || 'professional';
  const formattedSkills = skills.length > 0
    ? skills.slice(0, 5).join(', ')
    : 'modern technologies';
  
  let summary = template
    .replace('{role}', formattedRole)
    .replace('{skills}', formattedSkills);
  
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
 * Generates a professional summary using Gemini AI
 */
export async function generateAISummary(
  role: string,
  skills: string[],
  experienceLevel: 'entry-level' | 'mid-level' | 'senior'
): Promise<string> {
  try {
    const genAI = getGeminiAPI();
    
    // Use fallback if API not available
    if (!genAI) {
      return generateFallbackSummary(role, skills, experienceLevel);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Write a professional, concise resume summary (2-3 sentences, max 100 words) for a ${experienceLevel} ${role || 'professional'} with skills in ${skills.join(', ') || 'various technologies'}. 

Requirements:
- Make it compelling and achievement-focused
- Use action words and power verbs
- Highlight key strengths relevant to the role
- Keep it professional and ATS-friendly
- Do not use bullet points, just paragraph format
- Do not include headers or labels, just the summary text`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response
    const cleanedText = text
      .replace(/^(Summary:|Professional Summary:)/i, '')
      .trim();

    return cleanedText || generateFallbackSummary(role, skills, experienceLevel);
  } catch (error) {
    console.error('Error generating AI summary:', error);
    // Fallback to template-based generation
    return generateFallbackSummary(role, skills, experienceLevel);
  }
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
