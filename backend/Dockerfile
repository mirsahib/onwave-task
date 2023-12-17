# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3001

# Define the command to start the app
CMD ["npm","run", "dev"]
