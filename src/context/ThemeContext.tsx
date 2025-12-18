'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Available accent colors with gradient support
export const ACCENT_COLORS = [
  { name: 'blue', label: 'Ocean', color: '#3b82f6', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'purple', label: 'Violet', color: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
  { name: 'green', label: 'Emerald', color: '#10b981', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'orange', label: 'Sunset', color: '#f97316', gradient: 'from-orange-500 to-amber-500' },
  { name: 'rose', label: 'Rose', color: '#f43f5e', gradient: 'from-rose-500 to-orange-500' },
];

// Theme presets for quick selection
export const THEME_PRESETS = [
  { name: 'minimal', label: 'Minimal', description: 'Clean black & white' },
  { name: 'modern', label: 'Modern', description: 'Accent colors' },
  { name: 'creative', label: 'Creative', description: 'Gradient accents' },
];

type Theme = 'light' | 'dark';
type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'rose';
type ThemePreset = 'minimal' | 'modern' | 'creative';

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  themePreset: ThemePreset;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  setThemePreset: (preset: ThemePreset) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [accentColor, setAccentColorState] = useState<AccentColor>('blue');
  const [themePreset, setThemePresetState] = useState<ThemePreset>('modern');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('resume-theme') as Theme;
    const savedAccent = localStorage.getItem('resume-accent') as AccentColor;
    const savedPreset = localStorage.getItem('resume-preset') as ThemePreset;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    if (savedAccent) {
      setAccentColorState(savedAccent);
    }
    
    if (savedPreset) {
      setThemePresetState(savedPreset);
    }
    
    setMounted(true);
  }, []);

  // Apply theme classes to document with smooth transition
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    ACCENT_COLORS.forEach(c => root.classList.remove(`accent-${c.name}`));
    THEME_PRESETS.forEach(p => root.classList.remove(`preset-${p.name}`));
    
    // Add current theme classes
    root.classList.add(theme);
    root.classList.add(`accent-${accentColor}`);
    root.classList.add(`preset-${themePreset}`);
    
    // Save to localStorage
    localStorage.setItem('resume-theme', theme);
    localStorage.setItem('resume-accent', accentColor);
    localStorage.setItem('resume-preset', themePreset);
  }, [theme, accentColor, themePreset, mounted]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const setAccentColor = (color: AccentColor) => {
    setIsTransitioning(true);
    setAccentColorState(color);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const setThemePreset = (preset: ThemePreset) => {
    setIsTransitioning(true);
    setThemePresetState(preset);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        accentColor, 
        themePreset,
        toggleTheme, 
        setAccentColor,
        setThemePreset,
        isTransitioning
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
