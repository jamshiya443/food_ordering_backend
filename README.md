# TastyCart – Backend API

This repository contains the backend of TastyCart, a full-stack online food ordering application built using Node.js, Express.js, and MongoDB.

The backend provides REST APIs for user authentication, product management, cart and order operations, and administrator functionalities.

##  Deployment

**Live Backend:** https://food-ordering-backend-773w.onrender.com

**Frontend:** https://tastycart-theta.vercel.app/

**Backend Repository:** https://github.com/jamshiya443/food_ordering_backend

##  Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Product management
- Order creation and retrieval
- Customer order history
- Admin order management
- Order status updates
- MongoDB database integration

##  Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

##  Project Structure

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

##  Run Locally

1. Clone the backend repository:

```bash
git clone https://github.com/jamshiya443/food_ordering_backend.git
```

2. Navigate to the backend folder:

```bash
cd food_ordering_backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the backend root directory and configure the required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use your own MongoDB connection string and a secure JWT secret. Never commit your actual `.env` file.

5. Start the backend:

```bash
npm start
```

The server will run on:

```text
http://localhost:5000
```

##  API Base URL

```text
https://food-ordering-backend-773w.onrender.com/api
```

##  Authentication and Authorization

- JWT tokens are used to authenticate users.
- Passwords are securely hashed.
- Protected routes require valid authentication.
- Admin-only routes require administrator authorization.
- Public registration creates regular user accounts.

## Database

MongoDB Atlas is used as the cloud database, with Mongoose for schema definition and database operations.

##  Project Objective

The backend provides the server-side functionality for TastyCart, handling authentication, database operations, product management, and order processing through RESTful APIs.
