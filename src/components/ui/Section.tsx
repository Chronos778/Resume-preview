'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  action?: React.ReactNode;
  badge?: string | number;
  description?: string;
}

/**
 * Premium Collapsible Section Component with smooth animations
 */
export function Section({
  title,
  icon,
  children,
  defaultOpen = true,
  action,
  badge,
  description,
}: SectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <motion.div
      layout
      className="section-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="section-header w-full"
      >
        <div className="section-title">
          {icon && (
            <div className="section-icon">
              {icon}
            </div>
          )}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-base">{title}</span>
              {badge !== undefined && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  {badge}
                </motion.span>
              )}
            </div>
            {description && (
              <span className="text-xs text-muted-foreground font-normal">
                {description}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {action && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {action}
            </div>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: 'easeOut' },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: 'easeIn' },
                opacity: { duration: 0.1 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="section-content space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Simple Card component for grouping content
 */
export function Card({ 
  children, 
  className = '',
  hover = false,
}: { 
  children: React.ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: 'var(--shadow-md)' } : undefined}
      className={`
        bg-card border border-border rounded-xl
        transition-all duration-200
        ${hover ? 'cursor-pointer hover:border-border-hover' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

/**
 * Divider component
 */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`h-px bg-border my-4 ${className}`} />
  );
}
