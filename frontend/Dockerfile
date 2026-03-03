# Stage 1: Build the Angular app
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy source and build for production
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve with nginx
FROM nginx:stable-alpine AS production

# Use a lightweight nginx config suitable for single-page apps
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder. This copies the inner dist folder contents.
COPY --from=builder /app/dist/*/browser /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

