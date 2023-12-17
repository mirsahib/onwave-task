# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the project
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000 3010

# Define the command to start the app
CMD ["npm", "run", "host"]
