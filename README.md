# MERN Catalogue Backend

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (Auth required)
- `PUT /api/products/:id` - Update product (Auth required)
- `DELETE /api/products/:id` - Delete product (Auth required)

## Setup

1. Clone repo
2. `npm install`
3. Create `.env` file
4. `npm run dev`
