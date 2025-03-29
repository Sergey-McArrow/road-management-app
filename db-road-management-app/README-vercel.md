pnpm install -g vercel# Deploying JSON Server to Vercel

This guide explains how to deploy the Road Management API (JSON Server) to Vercel.

## Project Structure

- `api/server.js` - The serverless function that runs the JSON Server
- `db.json` - The database file containing all the road management data
- `vercel.json` - Configuration for Vercel deployment
- `package.json` - Project dependencies and scripts

## How It Works

1. The `vercel.json` file configures:

   - The serverless function at `api/server.js`
   - Memory allocation (1024MB)
   - Includes the `db.json` file in the deployment
   - Rewrites all routes to the serverless function

2. The `api/server.js` file:
   - Creates a JSON Server instance
   - Configures CORS to allow requests from any origin
   - Loads the database from `db.json`
   - Exports a handler for Vercel serverless functions

## Deployment Steps

1. Make sure you have the Vercel CLI installed:

   ```
   pnpm install -g vercel
   ```

2. Login to Vercel:

   ```
   vercel login
   ```

3. Deploy the project:

   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

## Important Notes

- The `db.json` file is included in the deployment, so any changes to the database will require a new deployment.
- The serverless function has a memory limit of 1024MB, which should be sufficient for most JSON Server use cases.
- All API endpoints will be available at the root of your Vercel deployment URL.

## API Usage

Once deployed, you can access your API at:

```
https://your-vercel-deployment-url.vercel.app/
```

For example:

- GET all items: `https://your-vercel-deployment-url.vercel.app/items`
- GET a specific item: `https://your-vercel-deployment-url.vercel.app/items/1`
- POST a new item: `https://your-vercel-deployment-url.vercel.app/items`
