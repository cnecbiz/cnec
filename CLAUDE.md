# CLAUDE.md - AI Assistant Guide for cnec

This document provides essential context for AI assistants working with this codebase.

## Project Overview

**cnec** is a React single-page application (SPA) built with Vite and integrated with Supabase for backend services. The project is deployed on Netlify.

### Tech Stack

- **Frontend Framework**: React 19.2
- **Build Tool**: Vite 7.2
- **Backend/Database**: Supabase
- **Hosting**: Netlify
- **Linting**: ESLint 9 with React plugins

## Directory Structure

```
cnec/
├── src/
│   ├── assets/          # Static assets (images, SVGs)
│   ├── lib/
│   │   └── supabase.js  # Supabase client configuration
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component-specific styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static files served as-is
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint flat config
├── netlify.toml         # Netlify deployment config
└── .env.example         # Environment variable template
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |

**Important**: Never commit `.env` files. Use `.env.example` as template.

## Code Conventions

### React Components

- Use functional components with hooks
- File extension: `.jsx` for React components
- Component files use PascalCase naming
- One component per file preferred

### Styling

- Global styles in `src/index.css`
- Component-specific styles in corresponding `.css` files
- Supports both light and dark color schemes via `prefers-color-scheme`

### ESLint Rules

The project uses ESLint flat config with these key rules:
- React Hooks rules enforced
- React Refresh compatibility for HMR
- Unused variables error (except those starting with uppercase or underscore)

### File Organization

- Utility/library code goes in `src/lib/`
- Static assets go in `src/assets/` or `public/`
- Environment variables must be prefixed with `VITE_` to be exposed to client

## Deployment

### Netlify Configuration

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20
- SPA routing: All paths redirect to `/index.html` (status 200)

### Environment Setup on Netlify

Set these environment variables in Netlify dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Supabase Integration

The Supabase client is initialized in `src/lib/supabase.js` and exports a configured `supabase` instance. Use this for:
- Authentication
- Database queries
- Real-time subscriptions
- Storage operations

Example usage:
```javascript
import { supabase } from './lib/supabase'

// Query data
const { data, error } = await supabase.from('table').select('*')
```

## Common Tasks for AI Assistants

### Adding a New Component

1. Create component file in `src/` or appropriate subdirectory
2. Use `.jsx` extension
3. Export as default
4. Import and use in parent component

### Adding a New Page (when router added)

1. Create component in `src/pages/`
2. Add route in router configuration
3. Netlify SPA redirect already handles client-side routing

### Working with Supabase

1. Import client: `import { supabase } from './lib/supabase'`
2. Use async/await with Supabase methods
3. Always handle errors from Supabase responses

### Styling Changes

1. Global styles: Modify `src/index.css`
2. Component styles: Create/modify corresponding `.css` file
3. Support both light/dark modes when applicable

## Testing

Currently no test framework configured. When adding tests:
- Recommended: Vitest (native Vite integration)
- For component testing: React Testing Library
- For E2E: Playwright or Cypress

## Known Limitations

- No routing library installed yet (vanilla React)
- No state management beyond React hooks
- No TypeScript (JavaScript only)
- No test setup configured

## Security Notes

- Never expose Supabase service role key in frontend
- Use Row Level Security (RLS) in Supabase
- All API keys in frontend are public - use only anon key
- Validate user input before database operations
