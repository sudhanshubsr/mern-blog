# MERN Stack Blog App (PulseOfMe)

Welcome to the MERN Stack Blog App! This is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to create, read, update, and delete blog posts.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)


## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sudhanshubsr-dev/mern-blog.git

   cd mern-blog

   cd client
   yarn install
   yarn start

   cd ../api
   yarn install
   yarn start
   ```
   ### Add Enviornment Varaibles
   - Create a new .env file inside api root directory and add the below enviornment variables
     ```bash
     ```
   - Create a new .env file inside client root directory and add the below enviornment variables
   - ```bash
     ```


## Features

- User authentication (Sign Up, Login, Logout)
- Create, Read, Update, and Delete blog posts
- Responsive design for various screen sizes
- View all blog posts

## Technologies Used
- MongoDB: Database for storing blog posts and user information
- Express.js: Backend framework for building the RESTful API
- React: Frontend library for building the user interface
- Node.js: JavaScript runtime for server-side development
- Redux: State management for React applications
- Axios: HTTP client for making API requests
- JWT: JSON Web Tokens for user authentication
- Mongoose: MongoDB object modeling for Node.js


## Folder Structure
```bash
    mern-blog/
├── client/                  # Frontend code (React)
├── api/                     # Backend code (Express.js)
├── vercel.json              # Vercel Configuration File

```
   
  
   
