'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { useResumeStore } from '@/store/resumeStore';
import { generateAISummary } from '@/utils/aiSummary';

/**
 * Premium Profile Summary Form with AI Generation Feature
 */
export function SummaryForm() {
  const { summary, setSummary, role, skills, experiences } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);
  const [showTip, setShowTip] = useState(true);

  // Reset highlight after generation
  useEffect(() => {
    if (justGenerated) {
      const timer = setTimeout(() => setJustGenerated(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [justGenerated]);

  // Generate AI summary based on user's role, skills, and experience
  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setShowTip(false);

    try {
      const experienceLevel = experiences.length === 0
        ? 'entry-level'
        : experiences.length <= 2
          ? 'mid-level'
          : 'senior';

      const skillNames = skills.map(s => s.name);
      const generatedSummary = await generateAISummary(role, skillNames, experienceLevel);
      setSummary(generatedSummary);
      setJustGenerated(true);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = role || skills.length > 0;

  return (
    <Section
      title="Professional Summary"
      icon={<FileText className="w-5 h-5" />}
      description="A brief overview of your professional background"
    >
      {/* AI Generation Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Button
          variant={canGenerate ? 'gradient' : 'secondary'}
          size="sm"
          onClick={handleGenerateSummary}
          isLoading={isGenerating}
          icon={isGenerating ? undefined : <Wand2 className="w-4 h-4" />}
          disabled={!canGenerate}
        >
          {isGenerating ? 'Generating...' : 'Generate with AI'}
        </Button>

        {summary && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isGenerating || !canGenerate}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Regenerate
          </Button>
        )}
      </div>

      {/* AI Generation Status */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 mb-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">AI is crafting your summary...</p>
                <p className="text-sm text-muted-foreground">Analyzing your role and skills</p>
              </div>
            </div>
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Area with highlight effect */}
      <div className={`relative ${justGenerated ? 'ai-text-highlight rounded-xl' : ''}`}>
        <TextArea
          label="Your Summary"
          placeholder="Write a compelling summary about yourself, your experience, and what you bring to the table..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
        />
      </div>

      {/* Tip */}
      <AnimatePresence>
        {showTip && !summary && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-2 p-3 rounded-xl bg-accent-light/50 border border-primary/10"
          >
            <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Pro tip:</span> Add your role and at least 3 skills first, then click &quot;Generate with AI&quot; for a personalized professional summary.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
