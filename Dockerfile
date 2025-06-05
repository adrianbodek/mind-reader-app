# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Define command to run application
CMD ["npm", "start"]
