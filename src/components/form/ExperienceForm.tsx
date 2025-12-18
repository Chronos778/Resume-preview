'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, Building2, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { useResumeStore } from '@/store/resumeStore';

/**
 * Premium Experience Section Form with timeline cards
 */
export function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } =
    useResumeStore();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Section
      title="Work Experience"
      icon={<Briefcase className="w-5 h-5" />}
      badge={experiences.length || undefined}
      description="Add your professional work history"
      action={
        <Button
          variant="gradient"
          size="sm"
          onClick={addExperience}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Experience
        </Button>
      }
    >
      <AnimatePresence mode="popLayout">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ delay: index * 0.05 }}
            layout
            className="group relative"
          >
            {/* Timeline indicator */}
            {index < experiences.length - 1 && (
              <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
            )}

            <div className="relative rounded-xl bg-card border border-border hover:border-border-hover hover:shadow-md transition-all duration-300">
              {/* Header - always visible */}
              <div
                className="p-4 flex items-start gap-4 cursor-pointer"
                onClick={() => toggleExpand(exp.id)}
              >
                {/* Timeline dot */}
                <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-sm">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>

                {/* Summary info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground truncate">
                        {exp.role || 'New Position'}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {exp.company || 'Company Name'} • {exp.duration || 'Duration'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error-light transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                      <motion.div
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
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
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Job Title"
                          placeholder="Software Engineer"
                          value={exp.role}
                          icon={<Briefcase className="w-4 h-4" />}
                          onChange={(e) =>
                            updateExperience(exp.id, { role: e.target.value })
                          }
                          error={!exp.role.trim() ? "Job title is required" : ""}
                        />
                        <Input
                          label="Company"
                          placeholder="Acme Inc."
                          value={exp.company}
                          icon={<Building2 className="w-4 h-4" />}
                          onChange={(e) =>
                            updateExperience(exp.id, { company: e.target.value })
                          }
                          error={!exp.company.trim() ? "Company name is required" : ""}
                        />
                      </div>

                      <Input
                        label="Duration"
                        placeholder="Jan 2022 - Present"
                        value={exp.duration}
                        icon={<Calendar className="w-4 h-4" />}
                        onChange={(e) =>
                          updateExperience(exp.id, { duration: e.target.value })
                        }
                      />

                      <TextArea
                        label="Description"
                        placeholder="• Led development of key features...&#10;• Collaborated with cross-functional teams...&#10;• Achieved 40% improvement in performance..."
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(exp.id, { description: e.target.value })
                        }
                        rows={4}
                      />

                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Pro tip: Use bullet points to highlight key achievements
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty state */}
      {experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 px-4 rounded-xl border-2 border-dashed border-border"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No experience added</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your work history to showcase your professional background
          </p>
          <Button
            variant="gradient"
            onClick={addExperience}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Your First Experience
          </Button>
        </motion.div>
      )}
    </Section>
  );
}
