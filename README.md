# 📄 ResumeForge - Premium Resume Builder

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, feature-rich resume builder with real-time preview and dark mode support**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage)

</div>

---

## ✨ Features

### 🎨 **Premium UI/UX**
- **Dark & Light Mode** - Seamless theme switching with system preference detection
- **Theme Presets** - Choose between Minimal, Modern, and Creative themes
- **Accent Colors** - 5 beautiful color schemes (Ocean, Violet, Emerald, Sunset, Rose)
- **Glassmorphism Effects** - Modern frosted glass UI elements
- **Smooth Animations** - Powered by Framer Motion for buttery smooth interactions

### 📝 **Resume Sections**
- **Personal Information** - Name, role, contact details with icon-enhanced inputs
- **Professional Summary** - AI-powered summary generation (mock)
- **Skills** - Interactive skill management with proficiency levels
- **Work Experience** - Collapsible timeline cards with rich descriptions
- **Education** - Academic background with expandable details
- **Projects** - Showcase your portfolio with tech tags and links
- **Social Links** - GitHub, LinkedIn, Portfolio, Twitter with validation

### 🔥 **Advanced Features**
- **Real-time Preview** - See changes instantly as you type
- **PDF Export** - Download your resume as a professional PDF
- **Print Support** - Optimized for printing
- **Zoom Controls** - Adjust preview size (50%-150%)
- **Progress Tracking** - Visual completion indicator
- **Sample Data** - Quick start with pre-filled example data
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Form Validation** - Built-in validation for all input fields
- **State Persistence** - Auto-save to localStorage
- **Collapsible Sections** - Organize your workflow efficiently

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chronos778/Resume-preview.git
   cd Resume-preview
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Zustand** | Lightweight state management |
| **html2canvas** | HTML to canvas conversion |
| **jsPDF** | PDF generation |
| **Lucide React** | Beautiful icon library |

---

## 📖 Usage

### Building Your Resume

1. **Fill in Personal Information**
   - Enter your name, role, email, phone, and location
   - All fields support real-time validation

2. **Add Professional Summary**
   - Write or generate an AI-powered summary
   - Use the regenerate button for variations

3. **Add Skills**
   - Type skills and press Enter to add
   - Adjust proficiency levels with sliders
   - Quick-add from suggested skills

4. **Add Experience**
   - Click "Add Experience" to create entries
   - Fill in role, company, duration, and description
   - Use bullet points for better readability

5. **Add Education**
   - Include your degrees and institutions
   - Add GPA, honors, and relevant coursework

6. **Add Projects**
   - Showcase your best work
   - Include technologies and live links

7. **Add Social Links**
   - Connect your online presence
   - Automatic URL validation

### Customizing Theme

1. Click the **Theme Toggle** button in the header
2. Choose between:
   - **Light/Dark Mode** - Toggle with sun/moon icons
   - **Accent Colors** - Select from 5 color schemes
   - **Theme Presets**:
     - Minimal: Clean black & white
     - Modern: Colorful accents
     - Creative: Enhanced gradients

### Exporting Your Resume

1. Click the **Export PDF** button
2. Your resume will be downloaded as a PDF file
3. Alternatively, use **Print** for direct printing

---

## 📁 Project Structure

```
Resume-preview/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and CSS variables
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── form/                 # Form components
│   │   │   ├── HeaderForm.tsx
│   │   │   ├── SummaryForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── ProjectsForm.tsx
│   │   │   └── SocialLinksForm.tsx
│   │   ├── preview/
│   │   │   └── ResumePreview.tsx # Resume preview component
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── SkillTag.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── MainLayout.tsx        # Main app layout
│   │   └── ResumeForm.tsx        # Form container
│   ├── context/
│   │   └── ThemeContext.tsx      # Theme state management
│   ├── store/
│   │   └── resumeStore.ts        # Zustand store
│   └── utils/
│       ├── aiSummary.ts          # AI summary generation
│       └── validation.ts         # Form validation
├── public/                       # Static assets
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 Design Philosophy

ResumeForge follows modern design principles:

- **Glassmorphism** - Frosted glass effects for depth
- **Neumorphism** - Soft shadows and highlights
- **Micro-interactions** - Delightful hover and click effects
- **Consistent Spacing** - 8px grid system
- **Accessible Colors** - WCAG 2.1 AA compliant
- **Typography** - Inter font family for readability

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- PDF export may have slight styling differences from preview
- Mobile view requires manual toggle between edit/preview modes
- AI summary generation is currently mocked (future integration planned)

---

## 📝 Roadmap

- [ ] Real AI summary generation integration
- [ ] Multiple resume templates
- [ ] Import from LinkedIn
- [ ] Export to Word (.docx)
- [ ] ATS optimization score
- [ ] Collaborative editing
- [ ] Resume templates marketplace
- [ ] Cover letter generator

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](#) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

## 📧 Contact

**Project Link:** [https://github.com/Chronos778/Resume-preview](https://github.com/Chronos778/Resume-preview)

---

<div align="center">

Made with ❤️ using Next.js, React, and Tailwind CSS

⭐ Star this repo if you find it helpful!

</div>
