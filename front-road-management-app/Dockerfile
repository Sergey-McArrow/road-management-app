FROM oven/bun:1 as builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install only production dependencies
RUN bun install --omit dev

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN bun run build

# Production image
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
