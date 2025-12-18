'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'striped';
  className?: string;
  animated?: boolean;
}

/**
 * Premium Progress Bar Component with animations
 */
export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'gradient',
  className = '',
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-primary',
    gradient: 'bg-gradient-to-r from-primary to-accent',
    striped: `bg-primary bg-[length:1rem_1rem] 
      bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]`,
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground font-medium">Progress</span>
          <motion.span 
            key={percentage}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold text-foreground tabular-nums"
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      )}
      <div className={`w-full bg-secondary rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? 0.8 : 0, 
            ease: [0.4, 0, 0.2, 1],
            delay: animated ? 0.1 : 0,
          }}
          className={`h-full rounded-full ${variantClasses[variant]} ${
            variant === 'striped' && animated ? 'animate-[progress-stripes_1s_linear_infinite]' : ''
          }`}
        />
      </div>
    </div>
  );
}

/**
 * Circular Progress Component
 */
export function CircularProgress({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  showLabel = true,
  className = '',
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            strokeDasharray: circumference,
          }}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
      {showLabel && (
        <motion.span
          key={percentage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute text-sm font-bold text-foreground tabular-nums"
        >
          {Math.round(percentage)}%
        </motion.span>
      )}
    </div>
  );
}
