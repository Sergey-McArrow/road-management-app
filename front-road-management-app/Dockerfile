FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json ./
RUN bun install

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pass build-time variables
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN bun run build

# Production image, copy all the files and run the app
FROM base AS runner
ENV NODE_ENV production

# Pass runtime environment variables
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN bun install --production
RUN rm -rf /app/node_modules/.cache

EXPOSE 3000

# Create a script to inject environment variables at runtime
RUN echo '#!/bin/sh\ncat <<EOF > ./dist/env-config.js\nwindow.ENV = {\n  VITE_API_URL: "${VITE_API_URL}"\n};\nEOF\nbunx vite preview --host 0.0.0.0 --port 3000' > ./start.sh && \
    chmod +x ./start.sh

# Use the start script
CMD ["./start.sh"]
