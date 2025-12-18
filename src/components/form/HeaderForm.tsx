'use client';

import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Section } from '@/components/ui/Section';
import { useResumeStore } from '@/store/resumeStore';

/**
 * Premium Header Section Form
 * Handles name, role, contact info, and location with floating labels
 */
export function HeaderForm() {
  const { name, role, email, phone, location, setName, setRole, setEmail, setPhone, setLocation } =
    useResumeStore();

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'email') {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Invalid email address';
      }
    }
    if (field === 'name' && !value.trim()) {
      error = 'Name is required';
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <Section
      title="Personal Information"
      icon={<User className="w-5 h-5" />}
      description="Your basic contact details"
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateField('name', e.target.value);
          }}
          onBlur={() => validateField('name', name)}
          error={errors.name}
          icon={<User className="w-4 h-4" />}
        />

        <Input
          label="Job Title / Role"
          placeholder="Full Stack Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          icon={<Briefcase className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField('email', e.target.value);
          }}
          onBlur={() => validateField('email', email)}
          error={errors.email}
          icon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          icon={<Phone className="w-4 h-4" />}
        />
      </div>

      <Input
        label="Location"
        placeholder="San Francisco, CA"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        icon={<MapPin className="w-4 h-4" />}
      />
    </Section>
  );
}
