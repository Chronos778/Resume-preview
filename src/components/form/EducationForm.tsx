'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, Trash2, Building, Calendar, Award, ChevronDown } from 'lucide-react';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { useResumeStore } from '@/store/resumeStore';

/**
 * Premium Education Section Form with collapsible cards
 */
export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } =
    useResumeStore();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Section
      title="Education"
      icon={<GraduationCap className="w-5 h-5" />}
      badge={education.length || undefined}
      description="Your academic background"
      action={
        <Button
          variant="gradient"
          size="sm"
          onClick={addEducation}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Education
        </Button>
      }
    >
      <AnimatePresence mode="popLayout">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ delay: index * 0.05 }}
            layout
            className="group relative"
          >
            {/* Timeline indicator */}
            {index < education.length - 1 && (
              <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 to-transparent" />
            )}

            <div className="relative rounded-xl bg-card border border-border hover:border-border-hover hover:shadow-md transition-all duration-300">
              {/* Header - always visible */}
              <div
                className="p-4 flex items-start gap-4 cursor-pointer"
                onClick={() => toggleExpand(edu.id)}
              >
                {/* Timeline dot */}
                <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>

                {/* Summary info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground truncate">
                        {edu.degree || 'New Degree'}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {edu.institution || 'Institution'} • {edu.year || 'Year'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error-light transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove education"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                      <motion.div
                        animate={{ rotate: expandedId === edu.id ? 180 : 0 }}
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
                {expandedId === edu.id && (
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
                          label="Degree"
                          placeholder="B.S. Computer Science"
                          value={edu.degree}
                          icon={<Award className="w-4 h-4" />}
                          onChange={(e) =>
                            updateEducation(edu.id, { degree: e.target.value })
                          }
                          error={!edu.degree.trim() ? "Degree is required" : ""}
                        />
                        <Input
                          label="Institution"
                          placeholder="Stanford University"
                          value={edu.institution}
                          icon={<Building className="w-4 h-4" />}
                          onChange={(e) =>
                            updateEducation(edu.id, { institution: e.target.value })
                          }
                          error={!edu.institution.trim() ? "Institution is required" : ""}
                        />
                      </div>

                      <Input
                        label="Year"
                        placeholder="2019 - 2023"
                        value={edu.year}
                        icon={<Calendar className="w-4 h-4" />}
                        onChange={(e) =>
                          updateEducation(edu.id, { year: e.target.value })
                        }
                      />

                      <TextArea
                        label="Additional Details"
                        placeholder="GPA: 3.9/4.0, Dean's List, Relevant Coursework: Machine Learning, Data Structures..."
                        value={edu.description}
                        onChange={(e) =>
                          updateEducation(edu.id, { description: e.target.value })
                        }
                        rows={3}
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
      {education.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 px-4 rounded-xl border-2 border-dashed border-border"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 mx-auto mb-4 flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No education added</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your academic qualifications and achievements
          </p>
          <Button
            variant="gradient"
            onClick={addEducation}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Education
          </Button>
        </motion.div>
      )}
    </Section>
  );
}
