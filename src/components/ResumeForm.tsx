'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, RotateCcw, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar';
import { useResumeStore } from '@/store/resumeStore';
import {
  HeaderForm,
  SummaryForm,
  SkillsForm,
  ExperienceForm,
  EducationForm,
  ProjectsForm,
  SocialLinksForm,
} from '@/components/form';

/**
 * Premium Resume Form Component
 * Contains all form sections with progress tracking
 */
export function ResumeForm() {
  const { resetResume, loadSampleData, getCompletionPercentage } = useResumeStore();
  const completionPercentage = getCompletionPercentage();

  // Completion tips based on percentage
  const getCompletionTip = () => {
    if (completionPercentage === 0) return "Let's get started! Fill in your details.";
    if (completionPercentage < 30) return "Great start! Add more sections for a complete resume.";
    if (completionPercentage < 60) return "Looking good! Your resume is taking shape.";
    if (completionPercentage < 90) return "Almost there! Just a few more details.";
    return "Excellent! Your resume is ready to shine! ✨";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with actions */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-card/80 p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Resume Builder</h2>
              <p className="text-xs text-muted-foreground">Fill in your details below</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
              icon={<Database className="w-4 h-4" />}
            >
              <span className="hidden sm:inline">Load Sample</span>
              <span className="sm:hidden">Sample</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetResume}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Premium Completion Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-secondary/30 border border-border"
        >
          <div className="flex items-center gap-4">
            <CircularProgress
              value={completionPercentage}
              size={52}
              strokeWidth={4}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">
                  Resume Progress
                </span>
                {completionPercentage === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-success text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Complete
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {getCompletionTip()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Sections */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          <HeaderForm />
          <SummaryForm />
          <SkillsForm />
          <ExperienceForm />
          <EducationForm />
          <ProjectsForm />
          <SocialLinksForm />

          {/* Bottom padding for scroll comfort */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
