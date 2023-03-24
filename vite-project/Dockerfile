# Use an official Node runtime as a parent image
FROM node:14-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]