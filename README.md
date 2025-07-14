E-Commerce Backend API
A Node.js-based backend API for an e-commerce platform, built with Express.js and MongoDB. Supports user authentication, product management, and order processing.
Features

User Authentication: Register, login, and JWT-based authentication.
Product Management: CRUD operations for products (admin only).
Order Processing: Create and view orders.

Setup

Clone the repository:git clone <your-repo-url>
cd ecommerce-backend


Install dependencies:npm install


Create a .env file in the root directory with the following:PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key


Ensure MongoDB is running locally or provide a valid MongoDB URI.
Start the server:npm start

Or, for development with auto-restart:npm run dev



API Endpoints
Authentication

POST /api/auth/register - Register a new user
POST /api/auth/login - Login and receive JWT
GET /api/auth/profile - Get user profile (requires JWT)

Products

GET /api/products - Get all products
GET /api/products/:id - Get a single product
POST /api/products - Create a product (admin only)
PUT /api/products/:id - Update a product (admin only)
DELETE /api/products/:id - Delete a product (admin only)

Orders

POST /api/orders - Create an order (requires JWT)
GET /api/orders - Get user orders (requires JWT)

Project Structure
ecommerce-backend/
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
├── middleware/
│   ├── auth.js
├── .env
├── package.json
├── server.js
├── README.md

Dependencies

express: Web framework
mongoose: MongoDB ORM
jsonwebtoken: JWT authentication
bcryptjs: Password hashing
dotenv: Environment variables
express-validator: Input validation
nodemon: Development server

Notes

Ensure MongoDB is installed and running.
Replace your_jwt_secret_key in .env with a secure key.
Admin routes require isAdmin: true in the user model.
Stock is updated automatically when orders are placed.

License
MIT