'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderKanban, Plus, Trash2, ExternalLink, Code2, Link2, ChevronDown, Sparkles } from 'lucide-react';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { useResumeStore } from '@/store/resumeStore';

import { useTheme } from '@/context/ThemeContext';

/**
 * Premium Projects Section Form with collapsible cards
 */
export function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } =
    useResumeStore();
  const { themePreset } = useTheme();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Parse technologies into tags
  const getTechTags = (techString: string) => {
    return techString.split(',').map(t => t.trim()).filter(Boolean);
  };

  const isMinimal = themePreset === 'minimal';

  return (
    <Section
      title="Projects"
      icon={<FolderKanban className="w-5 h-5" />}
      badge={projects.length || undefined}
      description="Showcase your notable projects"
      action={
        <Button
          variant="gradient"
          size="sm"
          onClick={addProject}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Project
        </Button>
      }
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ delay: index * 0.05 }}
            layout
            className="group"
          >
            <div className="relative rounded-xl bg-card border border-border hover:border-border-hover hover:shadow-md transition-all duration-300">
              {/* Header - always visible */}
              <div
                className="p-4 flex items-start gap-4 cursor-pointer"
                onClick={() => toggleExpand(project.id)}
              >
                {/* Project icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isMinimal
                    ? 'bg-primary'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                  <FolderKanban className={`w-5 h-5 ${isMinimal ? 'text-primary-foreground' : 'text-white'}`} />
                </div>

                {/* Summary info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground truncate">
                          {project.name || 'New Project'}
                        </h4>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary hover:text-primary-hover transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {/* Tech tags preview */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {getTechTags(project.technologies).slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {getTechTags(project.technologies).length > 3 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">
                              +{getTechTags(project.technologies).length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); removeProject(project.id); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error-light transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                      <motion.div
                        animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded form fields */}
              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                      <Input
                        label="Project Name"
                        placeholder="E-Commerce Platform"
                        value={project.name}
                        icon={<FolderKanban className="w-4 h-4" />}
                        onChange={(e) =>
                          updateProject(project.id, { name: e.target.value })
                        }
                        error={!project.name.trim() ? "Project name is required" : ""}
                      />

                      <TextArea
                        label="Description"
                        placeholder="• Built a full-stack e-commerce platform with real-time inventory...&#10;• Implemented payment processing with Stripe...&#10;• Achieved 99.9% uptime..."
                        value={project.description}
                        onChange={(e) =>
                          updateProject(project.id, { description: e.target.value })
                        }
                        rows={3}
                      />

                      <Input
                        label="Technologies"
                        placeholder="React, Node.js, PostgreSQL, AWS"
                        value={project.technologies}
                        icon={<Code2 className="w-4 h-4" />}
                        onChange={(e) =>
                          updateProject(project.id, { technologies: e.target.value })
                        }
                      />
                      <p className="text-xs text-muted-foreground -mt-2">
                        Separate technologies with commas
                      </p>

                      <Input
                        label="Project Link"
                        placeholder="https://github.com/username/project"
                        value={project.link}
                        icon={<Link2 className="w-4 h-4" />}
                        onChange={(e) =>
                          updateProject(project.id, { link: e.target.value })
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty state */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 px-4 rounded-xl border-2 border-dashed border-border"
        >
          <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${isMinimal
              ? 'bg-secondary'
              : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
            }`}>
            <FolderKanban className={`w-7 h-7 ${isMinimal ? 'text-primary' : 'text-purple-500'}`} />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No projects added</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Showcase your best work to stand out from the crowd
          </p>
          <Button
            variant="gradient"
            onClick={addProject}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Your First Project
          </Button>
        </motion.div>
      )}
    </Section>
  );
}
