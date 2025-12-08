# CLAUDE.md - AI Assistant Guide for cnec

## Project Overview

**cnec** is a React-based single-page application (SPA) built with Vite and integrated with Supabase as the backend. The project is deployed on Netlify.

This is currently a starter/boilerplate project with the default Vite + React template and Supabase client configuration ready for use.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool & dev server |
| Supabase | 2.86.2 | Backend-as-a-Service (database, auth, storage) |
| ESLint | 9.39.1 | Code linting |
| Netlify | - | Hosting & deployment |

## Project Structure

```
cnec/
├── public/              # Static assets served as-is
│   └── vite.svg
├── src/
│   ├── assets/          # Bundled assets (processed by Vite)
│   │   └── react.svg
│   ├── lib/             # Utility libraries and configurations
│   │   └── supabase.js  # Supabase client initialization
│   ├── App.jsx          # Main application component
│   ├── App.css          # App-specific styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration (flat config)
├── netlify.toml         # Netlify deployment configuration
├── .env.example         # Environment variables template
└── .gitignore           # Git ignore patterns
```

## Development Setup

### Prerequisites
- Node.js v20+ (as specified in netlify.toml)
- npm (comes with Node.js)

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

### Installation
```bash
npm install
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all JS/JSX files |

## Key Files

### `src/lib/supabase.js`
Supabase client initialization. Import `supabase` from this file to interact with the backend:
```javascript
import { supabase } from './lib/supabase'
```

### `src/main.jsx`
Application entry point. Renders the App component inside React StrictMode.

### `src/App.jsx`
Main application component. Currently contains the default Vite + React demo.

### `vite.config.js`
Vite configuration with React plugin enabled.

### `eslint.config.js`
ESLint flat configuration with:
- React Hooks rules
- React Refresh rules for HMR
- `no-unused-vars` ignores variables starting with uppercase or underscore

### `netlify.toml`
Netlify deployment configuration:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20
- SPA routing: all routes redirect to `/index.html`

## Code Conventions

### File Naming
- React components: PascalCase (e.g., `App.jsx`, `UserProfile.jsx`)
- Utilities/libraries: camelCase (e.g., `supabase.js`, `utils.js`)
- CSS files: Match component name (e.g., `App.css` for `App.jsx`)

### Component Structure
- Use functional components with hooks
- Export components as default
- Keep components in `src/` or create subdirectories as needed

### Styling
- Use CSS files imported directly into components
- Global styles in `index.css`
- Component-specific styles in corresponding `.css` files
- Supports both light and dark color schemes via `prefers-color-scheme`

### Environment Variables
- Prefix with `VITE_` for client-side access
- Access via `import.meta.env.VITE_*`
- Never commit `.env` files (only `.env.example`)

## Supabase Integration

The Supabase client is pre-configured in `src/lib/supabase.js`. Use it for:
- Database queries
- Authentication
- Real-time subscriptions
- Storage operations

Example usage:
```javascript
import { supabase } from './lib/supabase'

// Query data
const { data, error } = await supabase
  .from('table_name')
  .select('*')

// Authentication
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

## Deployment

### Netlify (Production)
The project is configured for Netlify deployment:
1. Push to the repository
2. Netlify automatically builds and deploys
3. Set environment variables in Netlify dashboard

### Local Preview
```bash
npm run build
npm run preview
```

## AI Assistant Guidelines

### When Making Changes
1. **Read before editing**: Always read existing files before modifying them
2. **Run lint after changes**: Execute `npm run lint` to catch issues
3. **Test builds**: Run `npm run build` to verify production build works
4. **Preserve patterns**: Follow existing code conventions and patterns

### Adding New Features
1. Create components in `src/` with appropriate subdirectories
2. Add new routes by integrating a router (not currently installed)
3. Keep Supabase queries in dedicated files or hooks
4. Update this CLAUDE.md if adding significant new patterns

### Common Tasks
- **Add a new component**: Create in `src/components/ComponentName.jsx`
- **Add a new page**: Create in `src/pages/PageName.jsx` (add router first)
- **Add Supabase query**: Use the client from `src/lib/supabase.js`
- **Add styles**: Create matching CSS file or add to existing

### Security Considerations
- Never expose Supabase service role keys in client code
- Use only the anon key (`VITE_SUPABASE_ANON_KEY`) in the browser
- Implement Row Level Security (RLS) in Supabase for data protection
- Validate all user input before sending to Supabase

### What NOT to Do
- Don't commit `.env` files with real credentials
- Don't use `console.log` in production code
- Don't ignore ESLint errors
- Don't bypass React StrictMode warnings
