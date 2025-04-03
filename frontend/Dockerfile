# Development stage
FROM node:22-alpine
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_PUBLIC_API_URL=http://localhost:6616

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"] 