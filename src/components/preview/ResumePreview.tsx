'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Twitter,
  ExternalLink,
  Download,
  ZoomIn,
  ZoomOut,
  Printer,
  FileText,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Code,
  Sparkles,
  Upload,
} from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar';
import { Button, IconButton } from '@/components/ui/Button';

/**
 * Animation variants for sections
 */
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Premium Resume Preview Component with paper-like design
 */
export function ResumePreview() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [isExporting, setIsExporting] = useState(false);

  const {
    name,
    role,
    email,
    phone,
    location,
    summary,
    skills,
    experiences,
    education,
    projects,
    socialLinks,
    loadSampleData,
    setResumeData,
  } = useResumeStore();

  // Check if sections have content
  const hasHeader = name || role;
  const hasContact = email || phone || location;
  const hasSocialLinks = Object.values(socialLinks).some((link) => link);
  const hasSummary = summary.trim().length > 0;
  const hasSkills = skills.length > 0;
  const hasExperience = experiences.some((exp) => exp.role || exp.company);
  const hasEducation = education.some((edu) => edu.degree || edu.institution);
  const hasProjects = projects.some((proj) => proj.name);

  // Check if resume is empty
  const isEmpty = !hasHeader && !hasSummary && !hasSkills && !hasExperience && !hasEducation && !hasProjects;

  // Calculate completion percentage
  const completionSections = [hasHeader, hasContact, hasSummary, hasSkills, hasExperience, hasEducation];
  const completionPercent = Math.round((completionSections.filter(Boolean).length / completionSections.length) * 100);

  // Export to PDF function
  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };



  const handleExportJSON = () => {
    const data = {
      name,
      role,
      email,
      phone,
      location,
      summary,
      skills,
      experiences,
      education,
      projects,
      socialLinks,
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name || 'resume'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setResumeData(json);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-card/80 border-b border-border p-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Completion indicator */}
          <div className="flex items-center gap-3">
            <CircularProgress value={completionPercent} size={36} strokeWidth={3} />
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-muted-foreground">Completion</p>
              <p className="text-sm font-semibold text-foreground">{completionPercent}%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/50 border border-border">
            <IconButton
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              disabled={zoom <= 50}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </IconButton>
            <span className="w-12 text-center text-sm font-medium text-muted-foreground">
              {zoom}%
            </span>
            <IconButton
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              disabled={zoom >= 150}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </IconButton>
          </div>

          {/* Import JSON button */}
          <div className="relative hidden sm:block">
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Import JSON"
            />
            <Button
              variant="outline"
              size="sm"
              icon={<Upload className="w-4 h-4" />}
            >
              Import
            </Button>
          </div>

          {/* Export JSON button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            icon={<FileText className="w-4 h-4" />}
            className="hidden sm:flex"
            disabled={isEmpty}
          >
            Save JSON
          </Button>

          {/* Export button */}
          <Button
            variant="gradient"
            size="sm"
            onClick={handleExportPDF}
            icon={<Download className="w-4 h-4" />}
            disabled={isEmpty || isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div
          className="mx-auto transition-transform duration-300 origin-top"
          style={{
            transform: `scale(${zoom / 100})`,
            maxWidth: '800px',
          }}
        >
          {/* Paper effect */}
          <div className="resume-paper">
            <div
              ref={resumeRef}
              className="bg-card text-foreground p-8 md:p-12 min-h-[1000px]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {isEmpty ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Your Resume Preview
                  </h3>
                  <p className="text-muted-foreground max-w-sm mb-6">
                    Start filling in your details on the left panel and watch your professional resume come to life here.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Sparkles className="w-4 h-4" />
                    <span>Real-time preview updates as you type</span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={loadSampleData}
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Load Sample Data
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence mode="sync">
                  {/* Header Section */}
                  {hasHeader && (
                    <motion.header
                      key="header"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-center mb-6"
                    >
                      {name && (
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                          {name}
                        </h1>
                      )}
                      {role && (
                        <p className="text-xl text-primary font-semibold tracking-wide uppercase">
                          {role}
                        </p>
                      )}
                    </motion.header>
                  )}

                  {/* Contact Info Bar */}
                  {(hasContact || hasSocialLinks) && (
                    <motion.div
                      key="contact"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8 pb-6 border-b-2 border-border"
                    >
                      {email && (
                        <a
                          href={`mailto:${email}`}
                          className="flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {email}
                        </a>
                      )}
                      {phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4" />
                          {phone}
                        </span>
                      )}
                      {location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {location}
                        </span>
                      )}
                      {socialLinks.github && (
                        <a
                          href={socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {socialLinks.linkedin && (
                        <a
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                      {socialLinks.portfolio && (
                        <a
                          href={socialLinks.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Portfolio
                        </a>
                      )}
                    </motion.div>
                  )}

                  {/* Summary Section */}
                  {hasSummary && (
                    <motion.section
                      key="summary"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-8"
                    >
                      <h2 className="resume-section-title">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Professional Summary
                      </h2>
                      <p className="text-foreground/90 leading-relaxed text-[15px]">{summary}</p>
                    </motion.section>
                  )}

                  {/* Skills Section */}
                  {hasSkills && (
                    <motion.section
                      key="skills"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-8"
                    >
                      <h2 className="resume-section-title">
                        <Code className="w-5 h-5 text-primary" />
                        Technical Skills
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                            className="space-y-1.5"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="font-semibold text-foreground">
                                {skill.name}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                {skill.proficiency}%
                              </span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Experience Section */}
                  {hasExperience && (
                    <motion.section
                      key="experience"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-8"
                    >
                      <h2 className="resume-section-title">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Professional Experience
                      </h2>
                      <div className="space-y-5">
                        {experiences
                          .filter((exp) => exp.role || exp.company)
                          .map((exp, index) => (
                            <motion.div
                              key={exp.id}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.1 }}
                              className="timeline-item"
                            >
                              <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                                <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                                {exp.duration && (
                                  <span className="text-sm text-muted-foreground font-medium">
                                    {exp.duration}
                                  </span>
                                )}
                              </div>
                              {exp.company && (
                                <p className="text-primary font-semibold text-sm mb-2">
                                  {exp.company}
                                </p>
                              )}
                              {exp.description && (
                                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                                  {exp.description}
                                </p>
                              )}
                            </motion.div>
                          ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Education Section */}
                  {hasEducation && (
                    <motion.section
                      key="education"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-8"
                    >
                      <h2 className="resume-section-title">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Education
                      </h2>
                      <div className="space-y-5">
                        {education
                          .filter((edu) => edu.degree || edu.institution)
                          .map((edu, index) => (
                            <motion.div
                              key={edu.id}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.1 }}
                              className="timeline-item"
                            >
                              <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                                <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                                {edu.year && (
                                  <span className="text-sm text-muted-foreground font-medium">
                                    {edu.year}
                                  </span>
                                )}
                              </div>
                              {edu.institution && (
                                <p className="text-primary font-semibold text-sm mb-2">
                                  {edu.institution}
                                </p>
                              )}
                              {edu.description && (
                                <p className="text-sm text-foreground/80">
                                  {edu.description}
                                </p>
                              )}
                            </motion.div>
                          ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Projects Section */}
                  {hasProjects && (
                    <motion.section
                      key="projects"
                      variants={sectionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2 className="resume-section-title">
                        <FolderKanban className="w-5 h-5 text-primary" />
                        Notable Projects
                      </h2>
                      <div className="space-y-5">
                        {projects
                          .filter((proj) => proj.name)
                          .map((proj, index) => (
                            <motion.div
                              key={proj.id}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.1 }}
                              className="timeline-item"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-foreground">{proj.name}</h3>
                                {proj.link && (
                                  <a
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                              {proj.description && (
                                <p className="text-sm text-foreground/80 mb-2 whitespace-pre-line">
                                  {proj.description}
                                </p>
                              )}
                              {proj.technologies && (
                                <div className="flex flex-wrap gap-1.5">
                                  {proj.technologies.split(',').map((tech, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                                    >
                                      {tech.trim()}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          ))}
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
