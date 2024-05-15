# 📦 Product Management API

Welcome to the Product Management API! This API is built with NestJS, Mongoose, and MongoDB. It allows you to manage products with CRUD operations.

## ✨ Features

- 🆕 **Create a Product**: Add a new product with details like name, price, description, category, and stock.
- 📋 **Get All Products**: Retrieve a list of all products.
- 🔍 **Get a Product by ID**: Retrieve details of a specific product by its ID.
- ✏️ **Update a Product**: Update details of an existing product.
- 🗑️ **Delete a Product**: Remove a product from the database.

## 🛠️ Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB (Local installation or MongoDB Atlas)

## 🚀 Getting Started

### 📥 Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/product-management-api.git
    cd product-management-api
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up MongoDB**:

    - For a local MongoDB setup, make sure MongoDB is running on your machine.
    - For MongoDB Atlas, get your connection string from the Atlas dashboard.

4. **Configure the database connection**:

    In `src/app.module.ts`, update the MongoDB connection string in `MongooseModule.forRoot`:

    ```typescript
    MongooseModule.forRoot('mongodb://localhost:27017/productdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // Or use your MongoDB Atlas connection string:
    // MongooseModule.forRoot('your-mongodb-atlas-connection-string', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }),
    ```

### 🏃 Running the Application

1. **Start the server**:

    ```sh
    npm run start
    ```

    The server will start on `http://localhost:3000`.

2. **Access the API documentation**:

    Open your browser and go to `http://localhost:3000/api` to view the Swagger documentation for the API.

### 🧪 Testing

1. **Run unit tests**:

    ```sh
    npm run test
    ```

2. **Run end-to-end tests**:

    ```sh
    npm run test:e2e
    ```

3. **Run test coverage**:

    ```sh
    npm run test:cov
    ```

## 📚 API Endpoints

### ➕ Create a Product

- **URL**: `/products`
- **Method**: `POST`
- **Body** (raw, JSON):

    ```json
    {
      "name": "Test Product",
      "price": 100,
      "description": "Test Description",
      "category": "Test Category",
      "stock": 10
    }
    ```

### 📋 Get All Products

- **URL**: `/products`
- **Method**: `GET`

### 🔍 Get a Product by ID

- **URL**: `/products/:id`
- **Method**: `GET`

### ✏️ Update a Product

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Body** (raw, JSON):

    ```json
    {
      "name": "Updated Product",
      "price": 150,
      "description": "Updated Description",
      "category": "Updated Category",
      "stock": 20
    }
    ```

### 🗑️ Delete a Product

- **URL**: `/products/:id`
- **Method**: `DELETE`

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Your Name](https://github.com/AkaTordu)