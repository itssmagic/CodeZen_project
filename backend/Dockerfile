# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies and required tools
RUN apk update && apk add --no-cache g++ python3 openjdk11 supervisor

# Copy package.json and install dependencies for both services
COPY package*.json .
RUN npm install

# Copy the application code
COPY . .

# Expose both ports
EXPOSE 5000 8000

# Copy the supervisord configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Command to start supervisord, which manages both processes
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
