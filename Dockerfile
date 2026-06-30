# ----------------------------------------------------------
# TAX CONSULTANTS
# Dockerfile
#
# This file tells Docker how to build and run
# the Next.js application.
# ----------------------------------------------------------

# Use the official Node.js 20 image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build the production application
RUN npm run build

# Expose the Next.js port
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]