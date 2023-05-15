# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire contents of the dist directory to the container
COPY dist/pd/ /app

# Install http-server globally
RUN npm install -g http-server

# Expose port 8080
EXPOSE 8080

# Start the http-server when the container starts
CMD [ "http-server", "-p", "8080" ]
