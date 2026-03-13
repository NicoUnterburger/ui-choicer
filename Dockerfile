# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencies installieren
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Source kopieren und bauen
COPY . .
RUN npm run build

# Production Stage - Nginx für statische Files
FROM nginx:alpine AS production

# Nginx Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Built files aus Builder Stage kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
