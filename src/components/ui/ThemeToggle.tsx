'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Palette, Check, Sparkles } from 'lucide-react';
import { useTheme, ACCENT_COLORS, THEME_PRESETS } from '@/context/ThemeContext';

/**
 * Premium Theme Toggle Component
 * Provides theme switching, accent colors, and preset selection
 */
export function ThemeToggle() {
  const { theme, accentColor, themePreset, toggleTheme, setAccentColor, setThemePreset, isTransitioning } = useTheme();
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Theme Customization Panel Trigger */}
      <div className="relative">
        <motion.button
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/80 hover:bg-secondary border border-border hover:border-border-hover transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Customize theme"
        >
          <div 
            className="w-4 h-4 rounded-full"
            style={{ background: ACCENT_COLORS.find(c => c.name === accentColor)?.color }}
          />
          <span className="text-sm font-medium text-foreground hidden sm:inline">Theme</span>
          <Palette className="w-4 h-4 text-muted-foreground" />
        </motion.button>
        
        {/* Expanded Theme Panel */}
        <AnimatePresence>
          {showPanel && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setShowPanel(false)}
              />
              
              {/* Panel */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="absolute right-0 top-full mt-2 w-72 p-4 bg-card rounded-2xl shadow-xl border border-border z-50"
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Customize Theme</h3>
                </div>

                {/* Mode Toggle */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Mode
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { if (theme !== 'light') toggleTheme(); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                        theme === 'light'
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </button>
                    <button
                      onClick={() => { if (theme !== 'dark') toggleTheme(); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                        theme === 'dark'
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Accent Colors */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    {ACCENT_COLORS.map((color) => (
                      <motion.button
                        key={color.name}
                        onClick={() => setAccentColor(color.name as any)}
                        className={`relative w-10 h-10 rounded-xl transition-all ${
                          accentColor === color.name 
                            ? 'ring-2 ring-offset-2 ring-offset-card ring-foreground scale-110' 
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.color }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Set ${color.label} accent`}
                        title={color.label}
                      >
                        {accentColor === color.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-white drop-shadow" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Theme Presets */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Style Preset
                  </label>
                  <div className="space-y-2">
                    {THEME_PRESETS.map((preset) => (
                      <motion.button
                        key={preset.name}
                        onClick={() => setThemePreset(preset.name as any)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                          themePreset === preset.name
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary'
                        }`}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div>
                          <div className="text-sm font-medium text-foreground">{preset.label}</div>
                          <div className="text-xs text-muted-foreground">{preset.description}</div>
                        </div>
                        {themePreset === preset.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className="relative p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border hover:border-border-hover transition-all overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
