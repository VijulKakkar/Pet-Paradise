# Step 1: Build the React app
FROM node:18 AS builder
WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the app (output will go to /app/dist)
RUN npm run build

# Step 2: Use nginx to serve the app
FROM nginx:alpine
# Copy build output to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for serving
EXPOSE 80

# Start nginx
CMD ["nginx", "-g","daemon off;"]