
# Dar Al Mal Exchange - Portfolio Website

A modern, responsive, bilingual (Arabic/English) portfolio website for a money exchange office built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🌍 Internationalization
- **Bilingual Support**: Arabic (default) and English
- **RTL/LTR Layouts**: Automatic direction switching based on language
- **next-intl Integration**: Seamless translation management
- **Language Switcher**: Easy language toggle in the header

### 🎨 Design
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Modern UI**: Clean, professional design with gradient accents
- **Arabic-Friendly Fonts**: Cairo font for Arabic, Inter for English
- **Smooth Animations**: Transition effects and hover states

### 📄 Pages
1. **Home**: Hero section with value proposition and service highlights
2. **About Us**: Company description, trust factors, and statistics
3. **Services**: Detailed service offerings with icons
4. **Branches**: Location information with Google Maps integration
5. **Contact**: Contact form and information

### 🔧 Technical Features
- **Next.js 14 App Router**: Modern routing with file-based system
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Utility-first CSS with custom theme
- **Theme Provider**: React Context for dark/light mode management
- **Accessibility**: ARIA labels, semantic HTML, focus states
- **SEO Optimized**: Proper meta tags and structure

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd daralmal
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to the default locale (Arabic): [http://localhost:3000/ar](http://localhost:3000/ar)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
daralmal/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── about/          # About page
│   │   ├── services/       # Services page
│   │   ├── branches/       # Branches page
│   │   ├── contact/        # Contact page
│   │   ├── layout.tsx      # Locale layout with fonts
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   ├── LanguageSwitcher.tsx
│   ├── ThemeToggle.tsx
│   └── ContactForm.tsx     # Contact form
├── lib/
│   └── providers/
│       └── theme-provider.tsx  # Theme context
├── messages/               # Translation files
│   ├── ar.json            # Arabic translations
│   └── en.json            # English translations
├── public/                # Static assets
├── i18n.ts               # i18n configuration
├── middleware.ts         # Next.js middleware for locale routing
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Customization

### Adding New Languages
1. Add the locale code to `i18n.ts`:
```typescript
export const locales = ["ar", "en", "fr"] as const;
```

2. Create a new translation file in `messages/fr.json`

3. Update the middleware matcher in `middleware.ts`

### Changing Theme Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  primary: { ... },
  gold: { ... },
}
```

### Adding New Pages
1. Create a new directory under `app/[locale]/`
2. Add a `page.tsx` file
3. Add translations to `messages/ar.json` and `messages/en.json`
4. Update navigation in `components/Header.tsx` and `components/Footer.tsx`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **next-intl**: Internationalization library
- **React Context**: State management for theme
- **Google Fonts**: Cairo (Arabic) and Inter (English)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC

## Contact

For questions or support, please contact:
- Email: info@daralmal.com
- Phone: +966 11 234 5678
