# Client Record Management Software
This project leverages the power of Next.js with a structured architecture that includes server actions, use case layers, and data access layers. It is designed to efficiently manage client records while providing features such as client tracking, reminders, and email notifications through scheduled cron jobs

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)

## Getting Started

To get started with this project, clone the repository and install the necessary dependencies:

### Running the Development Server

To start the development server with TurboPack, run:


## Available Scripts

This project comes with several npm scripts to facilitate development and deployment:

- `dev`: Start the development server with TurboPack.
- `build`: Build the application for production.
- `start`: Start the production server.
- `lint`: Run ESLint to check for code quality issues.
- `generate`: Generate database schema using Drizzle Kit.
- `migrate`: Run database migrations using Drizzle Kit.
- `studio`: Open Drizzle Kit studio for database management.
- `gms`: Generate, migrate, and open the Drizzle Kit studio in one command.
- `seed`: Seed the database with initial data using TypeScript.
- `email`: Run email development tools from the specified directory.


## Docker Setup

This project includes a Docker setup for both production and development environments. The Docker configuration allows you to build and run your application in isolated containers.

### Building the Docker Image

To build and run the Docker image, run:

Dev Env: `docker-compose -f docker-compose.dev.yml`

Prod Env: `docker-compose -f docker-compose.prod.yml`

## Environment Variables

Environment variables are crucial for configuring your application. You can find an example of required environment variables in the `.env.example` file. Make sure to create a `.env` file in your project root and populate it with appropriate values.

## Features

This application offers a variety of features to enhance client record management:

- **Client Record Management**: Easily add, update, and delete client records.
- **Reminders**: Schedule reminders for important tasks related to clients using cron jobs.
- **Email Notifications**: Automatically send email notifications for reminders or updates.
- **User-friendly Interface**: A clean and intuitive UI for seamless navigation.

