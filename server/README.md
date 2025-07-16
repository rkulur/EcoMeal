# Fastify Server Example

A simple REST API server built with Fastify that demonstrates basic CRUD operations.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3000.

## API Endpoints

### Items

- `GET /items` - Get all items
- `GET /items/:id` - Get a specific item by ID
- `POST /items` - Create a new item
  - Body: `{ "name": "Item Name" }`
- `PUT /items/:id` - Update an item
  - Body: `{ "name": "New Item Name" }`
- `DELETE /items/:id` - Delete an item

## Example Requests

Using curl:

```bash
# Get all items
curl http://localhost:3000/items

# Get item by ID
curl http://localhost:3000/items/1

# Create new item
curl -X POST -H "Content-Type: application/json" -d '{"name":"New Item"}' http://localhost:3000/items

# Update item
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Item"}' http://localhost:3000/items/1

# Delete item
curl -X DELETE http://localhost:3000/items/1
``` 