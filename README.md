# TastyCart – Backend API

The TastyCart backend is a RESTful API developed using Node.js, Express.js, and MongoDB. It handles user authentication, product management, cart checkout, and order processing for the TastyCart online food ordering application.

## Live Backend

**API URL:** https://food-ordering-backend-773w.onrender.com

## Features

- User registration and login
- Secure password hashing using bcryptjs
- JWT-based authentication
- Role-based authorization for customers and administrators
- Product management (Create, Read, Update, Delete)
- Product category filtering
- Order creation and management
- Stock validation and automatic stock updates
- Customer order history
- Admin order management
- MongoDB database integration

## Technology Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jamshiya443/food_ordering_backend.git
```

### 2. Navigate to the Backend Folder

```bash
cd food_ordering_backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

Replace the placeholder values with your own private configuration.

### 5. Start the Server

For normal startup:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend runs at:

http://localhost:5000

## API Overview

The API uses the `/api` base path.

| Module | Functionality |
|---|---|
| Authentication | Register and login |
| Products | View and manage products |
| Orders | Create and manage orders |
| Customer Orders | View personal order history |
| Admin | Manage products and order statuses |

Protected routes require a valid JWT token. Administrative routes require administrator authorization.

## Database

TastyCart uses MongoDB Atlas for cloud database storage and Mongoose for database operations.

Main collections:

- Users
- Products
- Orders

Passwords are stored as secure bcrypt hashes.

## Deployment

The backend is deployed using **Render** and connects to **MongoDB Atlas**.

- **Backend Hosting:** Render
- **Database Hosting:** MongoDB Atlas

## Security Notes

- Environment variables are stored privately.
- Passwords are hashed before storage.
- JWT authentication protects private routes.
- Role-based middleware restricts administrative operations.
- Never commit `.env` files or expose private credentials.

## Author

**Fathima Jamshiya**

Full-Stack Development Project

---

*TastyCart – Making food ordering simple and convenient.*