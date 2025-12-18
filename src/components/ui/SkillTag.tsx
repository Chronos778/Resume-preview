'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';

interface SkillTagProps {
  name: string;
  proficiency?: number;
  showProficiency?: boolean;
  onRemove?: () => void;
  editable?: boolean;
  variant?: 'default' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Premium Skill Tag/Pill Component with animations
 */
export function SkillTag({
  name,
  proficiency,
  showProficiency = false,
  onRemove,
  editable = false,
  variant = 'default',
  size = 'md',
}: SkillTagProps) {
  const { themePreset } = useTheme();

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const isMinimal = themePreset === 'minimal';

  const variantClasses = {
    default: 'bg-accent-light text-primary border border-transparent hover:border-primary',
    outline: 'bg-transparent text-primary border-2 border-primary/30 hover:border-primary hover:bg-accent-light',
    gradient: isMinimal
      ? 'bg-secondary text-primary border border-border hover:border-primary' // Minimal override
      : 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 hover:border-primary/40',
  };

  // Calculate proficiency dots (5 dots total)
  const dots = showProficiency && proficiency !== undefined
    ? Math.round(proficiency / 20)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      whileHover={{ y: -2, boxShadow: 'var(--shadow-sm)' }}
      layout
      className={`
        inline-flex items-center gap-2 rounded-full font-medium
        transition-all duration-200 cursor-default
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${editable ? 'pr-2' : ''}
      `}
    >
      <span>{name}</span>

      {/* Proficiency dots */}
      {showProficiency && proficiency !== undefined && (
        <div className="skill-dots flex gap-1 ml-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <motion.div
              key={dot}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: dot * 0.05 }}
              className={`skill-dot w-1.5 h-1.5 rounded-full transition-colors ${dot <= dots ? 'bg-primary' : 'bg-border'
                }`}
            />
          ))}
        </div>
      )}

      {/* Remove button */}
      {editable && onRemove && (
        <motion.button
          onClick={onRemove}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-0.5 hover:bg-primary/20 rounded-full transition-colors ml-1"
          aria-label={`Remove ${name}`}
        >
          <X className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </motion.div>
  );
}

/**
 * Skill Tag Input for adding new skills
 */
export function SkillTagInput({
  value,
  onChange,
  onAdd,
  placeholder = 'Add a skill...',
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder?: string;
  error?: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full px-4 py-3 pr-20 rounded-xl bg-input border-2 
          ${error ? 'border-error focus:border-error focus:ring-error/20' : 'border-input-border hover:border-border-hover focus:border-primary focus:ring-ring'}
          focus:ring-2 text-foreground placeholder:text-muted-foreground
          transition-all duration-200`}
      />
      {value.trim() && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onAdd}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 
            text-sm font-medium text-primary-foreground bg-primary 
            rounded-lg hover:bg-primary-hover transition-colors"
        >
          Add
        </motion.button>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
