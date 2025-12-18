'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Premium Button Component with multiple variants and animations
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      children,
      className = '',
      disabled,
      onClick,
      type = 'button',
    },
    ref
  ) => {
    const variants = {
      primary: `
        bg-primary text-primary-foreground 
        hover:bg-primary-hover 
        shadow-sm hover:shadow-md
        active:shadow-sm
      `,
      secondary: `
        bg-secondary text-secondary-foreground 
        hover:bg-secondary-hover
        border border-border hover:border-border-hover
      `,
      ghost: `
        bg-transparent 
        text-foreground 
        hover:bg-secondary
      `,
      danger: `
        bg-error text-white 
        hover:bg-red-600
        shadow-sm hover:shadow-md
      `,
      gradient: `
        bg-gradient-to-r from-primary to-accent
        text-primary-foreground font-semibold
        shadow-md hover:shadow-lg hover:shadow-primary/25
        relative overflow-hidden
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-500
      `,
      outline: `
        bg-transparent 
        text-primary 
        border-2 border-primary
        hover:bg-primary hover:text-primary-foreground
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
      md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
      lg: 'px-6 py-3.5 text-base rounded-xl gap-2',
      icon: 'p-2.5 rounded-xl',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-200 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        disabled={disabled || isLoading}
        onClick={onClick}
        type={type}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Icon Button variant for compact icon-only buttons
 */
interface IconButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

export function IconButton({
  children,
  className = '',
  disabled,
  onClick,
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      className={`
        p-2 rounded-xl
        text-muted-foreground hover:text-foreground
        bg-transparent hover:bg-secondary
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-ring
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      aria-label={props['aria-label']}
    >
      {children}
    </motion.button>
  );
}
