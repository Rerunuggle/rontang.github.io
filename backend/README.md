# My Web Backend

This is the backend API for the My Web application.

## Setup

1. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mywebapp
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Items

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a single item by ID
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- CORS
- dotenv
