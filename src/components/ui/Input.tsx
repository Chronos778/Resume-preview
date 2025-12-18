'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'floating';
}

/**
 * Premium Input Component with floating label support and animations
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, variant = 'floating', className = '', value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const hasValue = value !== undefined && value !== '';
    const isActive = isFocused || hasValue;

    return (
      <div className="space-y-1.5">
        <div className="relative">
          {/* Icon */}
          {icon && (
            <motion.div 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              animate={{ color: isFocused ? 'var(--primary)' : 'var(--muted-foreground)' }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}
          
          {/* Input field */}
          <input
            ref={ref}
            id={id}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            placeholder={variant === 'floating' ? '' : props.placeholder}
            className={`
              w-full px-4 py-3.5 rounded-xl
              bg-input border-2 text-foreground
              placeholder:text-transparent
              transition-all duration-200 ease-out
              ${icon ? 'pl-11' : ''}
              ${error 
                ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' 
                : 'border-input-border hover:border-border-hover focus:border-primary focus:ring-2 focus:ring-ring'
              }
              ${className}
            `}
            {...props}
          />
          
          {/* Floating Label */}
          {label && variant === 'floating' && (
            <motion.label
              htmlFor={id}
              className="absolute pointer-events-none text-muted-foreground font-medium"
              initial={false}
              animate={{
                top: isActive ? '-2px' : '50%',
                left: isActive ? '12px' : (icon ? '46px' : '16px'),
                y: isActive ? '0%' : '-50%',
                fontSize: isActive ? '0.75rem' : '0.875rem',
                color: isFocused ? 'var(--primary)' : 'var(--muted-foreground)',
                backgroundColor: isActive ? 'var(--card)' : 'transparent',
                paddingLeft: isActive ? '6px' : '0px',
                paddingRight: isActive ? '6px' : '0px',
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {label}
            </motion.label>
          )}
          
          {/* Static Label (non-floating) */}
          {label && variant === 'default' && (
            <label 
              htmlFor={id}
              className="absolute -top-2.5 left-3 px-1.5 text-xs font-medium text-muted-foreground bg-card"
            >
              {label}
            </label>
          )}
          
          {/* Focus ring animation */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={false}
            animate={{
              boxShadow: isFocused && !error
                ? '0 0 0 3px var(--ring)'
                : '0 0 0 0px transparent',
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
        
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              className="text-sm text-error flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'floating';
}

/**
 * Premium TextArea Component with floating label support
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, variant = 'floating', className = '', value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const hasValue = value !== undefined && value !== '';
    const isActive = isFocused || hasValue;

    return (
      <div className="space-y-1.5">
        <div className="relative">
          <textarea
            ref={ref}
            id={id}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            placeholder={variant === 'floating' ? '' : props.placeholder}
            className={`
              w-full px-4 py-3.5 rounded-xl
              bg-input border-2 text-foreground
              placeholder:text-transparent
              transition-all duration-200 ease-out resize-none
              min-h-[120px]
              ${error 
                ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' 
                : 'border-input-border hover:border-border-hover focus:border-primary focus:ring-2 focus:ring-ring'
              }
              ${className}
            `}
            {...props}
          />
          
          {/* Floating Label */}
          {label && variant === 'floating' && (
            <motion.label
              htmlFor={id}
              className="absolute left-4 pointer-events-none text-muted-foreground font-medium"
              initial={false}
              animate={{
                top: isActive ? '0px' : '16px',
                y: isActive ? '-50%' : '0%',
                fontSize: isActive ? '0.75rem' : '0.875rem',
                color: isFocused ? 'var(--primary)' : 'var(--muted-foreground)',
                backgroundColor: isActive ? 'var(--card)' : 'transparent',
                paddingLeft: isActive ? '6px' : '0px',
                paddingRight: isActive ? '6px' : '0px',
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {label}
            </motion.label>
          )}
        </div>
        
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-sm text-error flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
