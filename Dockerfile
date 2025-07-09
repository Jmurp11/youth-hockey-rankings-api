# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Development stage
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock* ./

# Install all dependencies (including dev dependencies)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build stage
FROM node:20-alpine AS build

# Define build arguments for environment variables
ARG NODE_ENV=production

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock* ./

# Install all dependencies (including dev dependencies needed for build)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables for build
ENV NODE_ENV=$NODE_ENV

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine AS production

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock* ./

# Install only production dependencies
RUN yarn install --production && yarn cache clean

# Copy built application from build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy healthcheck script
COPY healthcheck.js ./

# Change ownership of the app directory to the nestjs user
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables that can be overridden at runtime
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["node", "dist/main.js"]
