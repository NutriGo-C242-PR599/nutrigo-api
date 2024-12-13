# nutrigo-api
Backend API for the Nutrigo App, providing endpoints for nutrition education.

## Table of Contents

* [Getting Started](#getting-started)
* [API Endpoints](#api-endpoints)
    + [Authentication](#authentication)
    + [Products](#products)
* [License](#license)

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/nutrigo-api.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Use a tool like Postman or cURL to test the API endpoints

## API Endpoints

### Authentication

* **POST /api/v1/register**: Register a new user
    + Request Body:
        - `name`: string (required)
        - `email`: string (required, must be a valid email address)
        - `password`: string (required, minimum 6 characters)
    + Response: JSON object with user data and JWT token
* **POST /api/v1/login**: Login an existing user
    + Request Body:
        - `email`: string (required, must be a valid email address)
        - `password`: string (required)
    + Response: JSON object with user data and JWT token

### Products

* **POST /api/v1/products**: Create a new product
    + Request Body:
        - `barcode`: string (required)
        - `name`: string (required)
        - `nutrition`: object (required)
            - `energy`: number
            - `total_fat`: number
            - `saturated_fat`: number
            - `carbohydrate`: number
            - `sugar`: number
            - `sodium`: number
            - `protein`: number
    + Response: JSON object with product data
* **GET /api/v1/products**: Get all products
    + Response: JSON array of product data
* **GET /api/v1/products/{barcode}**: Get a product by barcode
    + Path Parameters:
        - `barcode`: string (required)
    + Response: JSON object with product data
* **PUT /api/v1/products/{barcode}**: Update a product
    + Path Parameters:
        - `barcode`: string (required)
    + Request Body:
        - `name`: string
        - `nutrition`: object
            - `energy`: number
            - `total_fat`: number
            - `saturated_fat`: number
            - `carbohydrate`: number
            - `sugar`: number
            - `sodium`: number
            - `protein`: number
    + Response: JSON object with updated product data

## License

This project is licensed under the CC0 1.0 Universal License. See [LICENSE](LICENSE) for more information.