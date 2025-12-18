'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Github, Linkedin, Globe, Twitter, ExternalLink, Check } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Section } from '@/components/ui/Section';
import { useResumeStore } from '@/store/resumeStore';
import { useTheme } from '@/context/ThemeContext';

// Social platform configs with brand colors
const SOCIAL_PLATFORMS = [
  {
    key: 'github' as const,
    icon: Github,
    label: 'GitHub',
    placeholder: 'https://github.com/username',
    color: 'from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
  {
    key: 'linkedin' as const,
    icon: Linkedin,
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/username',
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    key: 'portfolio' as const,
    icon: Globe,
    label: 'Portfolio',
    placeholder: 'https://yourportfolio.com',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    key: 'twitter' as const,
    icon: Twitter,
    label: 'Twitter/X',
    placeholder: 'https://twitter.com/username',
    color: 'from-sky-400 to-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20',
  },
];

// Simple URL validation
const isValidUrl = (url: string) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Premium Social Links Section Form with branded icons
 */
export function SocialLinksForm() {
  const { socialLinks, setSocialLink } = useResumeStore();
  const { themePreset } = useTheme();

  // Count filled links
  const filledCount = Object.values(socialLinks).filter(Boolean).length;

  return (
    <Section
      title="Social Links"
      icon={<Link2 className="w-5 h-5" />}
      badge={filledCount || undefined}
      description="Connect your online presence"
    >
      <div className="space-y-3">
        {SOCIAL_PLATFORMS.map(({ key, icon: Icon, label, placeholder, color, bgColor }, index) => {
          const value = socialLinks[key];
          const isValid = isValidUrl(value);

          // Override colors for minimal theme
          const isMinimal = themePreset === 'minimal';
          const finalColor = isMinimal ? 'from-primary to-primary' : color;
          const finalBgColor = isMinimal ? 'bg-secondary' : bgColor;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${value
                  ? `border-border-hover ${finalBgColor}`
                  : 'border-border hover:border-border-hover'
                }`}
            >
              {/* Platform icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${finalColor} flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon className={`w-5 h-5 ${isMinimal ? 'text-primary-foreground' : 'text-white dark:text-gray-900'}`} />
              </div>

              {/* Input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  {label}
                </label>
                <input
                  type="url"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setSocialLink(key, e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              {/* Status indicator */}
              {value && (
                <div className="flex items-center gap-2">
                  {isValid ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-success-light flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 text-success" />
                      </motion.div>
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </>
                  ) : (
                    <span className="text-xs text-warning">Invalid URL</span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tip */}
      <p className="text-xs text-muted-foreground text-center py-2">
        💡 Add links to help recruiters learn more about you
      </p>
    </Section>
  );
}
