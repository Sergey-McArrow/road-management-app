# Road Management Application

A React application for managing and visualizing road data with interactive maps, evaluations, and todo management.

## Features

- Interactive map with road visualization
- Road data overview with filtering and sorting
- Evaluation charts and statistics
- Todo management system
- Responsive design

## Prerequisites

- Bun 1.0 or higher
- Docker (optional, for containerized deployment)

## Local Development

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t road-management-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 road-management-app
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
leaflet-react-app/
├── src/
│   ├── api/          # API integration
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
└── dist/            # Production build output
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Leaflet
- Recharts
- Zod for validation
- PNPM for runtime and package management
- Bun for dockerization

## Development Commands

- `bun dev` - Start development server
- `bun run build` - Create production build
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking
