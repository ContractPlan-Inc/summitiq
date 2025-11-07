# ContractPlan Template

This is the production-ready base template for all NEXTIQ apps, modeled after ContractPlan.com. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Next.js 16** - Latest React framework with App Router support
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📘 **TypeScript** - Type safety with strict mode enabled
- 🧪 **Jest & React Testing Library** - Comprehensive testing setup
- 🔍 **ESLint & Prettier** - Code quality and formatting
- 🛡️ **Error Boundaries** - Production-ready error handling
- 📦 **Security Hardened** - All dependencies audited and secured

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd summitiq
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration values.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
summitiq/
├── pages/              # Next.js pages and API routes
│   ├── _app.tsx       # Custom App component
│   ├── _document.tsx  # Custom Document
│   ├── _error.tsx     # Custom error page
│   ├── 404.tsx        # Custom 404 page
│   ├── index.tsx      # Home page
│   └── dashboard.tsx  # Dashboard page
├── components/         # React components
│   └── ErrorBoundary.tsx
├── styles/            # Global styles
│   └── globals.css
├── public/            # Static assets
├── __tests__/         # Test files
└── ...config files
```

## Configuration Files

- `tsconfig.json` - TypeScript configuration with strict mode
- `.eslintrc.json` - ESLint rules for code quality
- `.prettierrc` - Prettier formatting rules
- `jest.config.js` - Jest testing configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration

## Testing

This project uses Jest and React Testing Library for testing.

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Code Quality

The project enforces code quality through:

- **TypeScript strict mode** - Maximum type safety
- **ESLint** - Code linting with Next.js recommended rules
- **Prettier** - Consistent code formatting
- **Pre-commit hooks** (recommended to add Husky)

Check code quality:
```bash
npm run lint
npm run format:check
```

Fix issues automatically:
```bash
npm run format
```

## Production Readiness Checklist

✅ TypeScript strict mode enabled
✅ ESLint and Prettier configured
✅ Testing infrastructure set up
✅ Error boundaries implemented
✅ Custom error pages (404, 500)
✅ Environment variable configuration
✅ Security vulnerabilities patched
✅ Proper .gitignore configuration
✅ Production build tested
✅ Favicon and metadata configured

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
# Build image
docker build -t contractplan .

# Run container
docker run -p 3000:3000 contractplan
```

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js applications:

- AWS Amplify
- Netlify
- Railway
- Render
- Fly.io

## Environment Variables

See `.env.example` for required and optional environment variables.

Key variables:
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_URL` - Application URL
- `NEXT_PUBLIC_API_URL` - API endpoint (if applicable)

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Run linting and tests
5. Submit a pull request

## License

Proprietary - ContractPlan Inc.

## Support

For issues and questions, contact the development team.
