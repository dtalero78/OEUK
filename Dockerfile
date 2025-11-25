# Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Copy frontend build to backend public folder
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "server.js"]
