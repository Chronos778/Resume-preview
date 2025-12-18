'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  FileText,
  Eye,
  Sparkles,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { Button, IconButton } from '@/components/ui/Button';

/**
 * Premium Main Layout Component
 * Split-screen layout with responsive design and animations
 */
export function MainLayout() {
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-[2000px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                ResumeForge
                <Sparkles className="w-4 h-4 text-accent" />
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Build your professional resume in minutes
              </p>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden md:inline">Star on GitHub</span>
            </a>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[2000px] mx-auto relative">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">
          {/* Left Panel - Form (Desktop always visible, Mobile conditional) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              width: isCollapsed ? '60px' : undefined,
            }}
            transition={{ duration: 0.3 }}
            className={`
              ${mobileView === 'form' ? 'block' : 'hidden'} lg:block
              w-full lg:w-1/2 xl:w-[45%] 
              border-r border-border bg-card
              relative
              ${isCollapsed ? 'lg:w-[60px] xl:w-[60px]' : ''}
            `}
          >
            {/* Collapse toggle (desktop only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-12 items-center justify-center bg-card border border-border rounded-full shadow-sm hover:bg-secondary transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ResumeForm />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed state indicator */}
            {isCollapsed && (
              <div className="h-full flex flex-col items-center justify-center py-8">
                <FileText className="w-6 h-6 text-muted-foreground mb-4" />
                <p className="text-xs text-muted-foreground writing-mode-vertical transform rotate-180"
                  style={{ writingMode: 'vertical-rl' }}>
                  Resume Editor
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`
              ${mobileView === 'preview' ? 'block' : 'hidden'} lg:block
              w-full flex-1
              bg-muted/20
            `}
          >
            <div className="lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] overflow-auto">
              <ResumePreview />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="text-red-500">❤️</span>
              <span>using</span>
              <span className="font-medium text-foreground">Next.js</span>
              <span>•</span>
              <span className="font-medium text-foreground">Tailwind CSS</span>
              <span>•</span>
              <span className="font-medium text-foreground">Framer Motion</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Terms
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
