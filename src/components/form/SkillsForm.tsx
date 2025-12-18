'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Plus, X, Sparkles, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SkillTag, SkillTagInput } from '@/components/ui/SkillTag';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useResumeStore } from '@/store/resumeStore';

// Suggested skills based on common roles
const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'AWS', 'Docker', 'Git', 'SQL', 'GraphQL',
  'Next.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Redis'
];

/**
 * Premium Skills Section Form with animated tags
 */
export function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');
  const [showProficiency, setShowProficiency] = useState(true);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);

  const [error, setError] = useState('');

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      setError('Skill name cannot be empty');
      return;
    }
    if (skills.find(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setError('Skill already exists');
      return;
    }

    addSkill(newSkill.trim());
    setNewSkill('');
    setError('');
  };

  const handleSuggestedClick = (skillName: string) => {
    if (!skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      addSkill(skillName);
      setError('');
    }
  };

  // Filter suggestions to exclude already added skills
  const availableSuggestions = SUGGESTED_SKILLS.filter(
    s => !skills.find(skill => skill.name.toLowerCase() === s.toLowerCase())
  );

  return (
    <Section
      title="Skills"
      icon={<Code className="w-5 h-5" />}
      badge={skills.length || undefined}
      description="Your technical and professional skills"
    >
      {/* Add new skill input */}
      <SkillTagInput
        value={newSkill}
        onChange={(val) => {
          setNewSkill(val);
          if (error) setError('');
        }}
        onAdd={handleAddSkill}
        placeholder="Type a skill and press Enter..."
        error={error}
      />

      {/* Suggested Skills */}
      {availableSuggestions.length > 0 && skills.length < 5 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Quick add suggestions
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 6).map((skill) => (
              <motion.button
                key={skill}
                onClick={() => handleSuggestedClick(skill)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-xs font-medium rounded-full
                  bg-secondary text-secondary-foreground
                  border border-border hover:border-primary hover:text-primary
                  transition-all duration-200"
              >
                + {skill}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle proficiency visibility */}
      <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
        <input
          type="checkbox"
          checked={showProficiency}
          onChange={(e) => setShowProficiency(e.target.checked)}
          className="w-4 h-4 rounded border-input-border text-primary focus:ring-primary"
        />
        Show proficiency levels in preview
      </label>

      {/* Skills list */}
      <AnimatePresence mode="popLayout">
        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
                className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border hover:border-border-hover transition-all"
              >
                {/* Drag handle (visual only for now) */}
                <div className="opacity-0 group-hover:opacity-50 transition-opacity cursor-grab">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Skill name */}
                <span className="font-medium text-foreground min-w-[100px]">
                  {skill.name}
                </span>

                {/* Proficiency slider */}
                {showProficiency && (
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) =>
                          updateSkill(skill.id, { proficiency: parseInt(e.target.value) })
                        }
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-primary
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-webkit-slider-thumb]:hover:scale-110"
                      />
                      {/* Visual track */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-primary to-accent rounded-full pointer-events-none"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground w-12 text-right tabular-nums">
                      {skill.proficiency}%
                    </span>
                  </div>
                )}

                {/* Remove button */}
                <motion.button
                  onClick={() => removeSkill(skill.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error-light transition-colors"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {skills.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 px-4 rounded-xl border-2 border-dashed border-border"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary mx-auto mb-3 flex items-center justify-center">
            <Code className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">No skills added yet</p>
          <p className="text-sm text-muted-foreground">
            Type a skill above or click a suggestion to get started
          </p>
        </motion.div>
      )}
    </Section>
  );
}
