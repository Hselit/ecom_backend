# E-Commerce Backend

REST API for an online store, built with **Express** and **TypeScript** and backed by **Prisma** and **MySQL**. It covers authentication, catalog, cart, checkout (orders and payments), reviews, inventory, and optional product image uploads. **OpenAPI** docs are served at `/api-docs`; default base URL is `http://localhost:<port>`.

<div align="center">
  <img src="images/E-Commerce Backend APIs.png" alt="Description">
</div>


## Authentication legend

| Mark | Meaning |
|------|---------|
| **🔓** | Public — no `Authorization` header required |
| **🔐** | Authorized — send a valid JWT: `Authorization: Bearer <token>` (obtain via `POST /login`) |

> Routes under `/access`, `/category`, `/product`, `/cart`, `/order`, `/review`, `/inventory`, and product-image paths are protected at the router level in `app.ts` (middleware runs before the handlers). `/user` mixes public and protected routes as listed below.

---

## API endpoints

### Documentation & static assets

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔓 | GET | `/api-docs` | Swagger UI (OpenAPI) |
| 🔓 | GET | `/uploads/*` | Served product upload files (e.g. `/uploads/products/...`) |

### Login

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔓 | POST | `/login` | User login (returns JWT) |

### User

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔓 | POST | `/user/register` | Register user |
| 🔓 | POST | `/user/verify/resend` | Resend email verification code |
| 🔓 | POST | `/user/verify` | Verify email |
| 🔓 | POST | `/user/forgot-password` | Forgot password flow |
| 🔐 | GET | `/user` | List users (query) |
| 🔐 | GET | `/user/:id` | Get user by id |
| 🔐 | PUT | `/user/:id` | Update user |
| 🔐 | DELETE | `/user/:id` | Delete user |

### Role

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔓 | GET | `/role` | List roles |
| 🔓 | POST | `/role` | Create role |
| 🔓 | DELETE | `/role/:id` | Delete role |

### Access type

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/access/type` | Create access type |
| 🔐 | GET | `/access/type` | List access types |
| 🔐 | GET | `/access/type/:id` | Get access type by id |
| 🔐 | PUT | `/access/type/:id` | Update access type |
| 🔐 | DELETE | `/access/type/:id` | Delete access type |

### Access role

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/access/role` | Create access-role mapping |
| 🔐 | GET | `/access/role` | List access roles |
| 🔐 | GET | `/access/role/:id` | Get access role by id |
| 🔐 | PUT | `/access/role/:id` | Update access role |
| 🔐 | DELETE | `/access/role/:id` | Delete access role |
| 🔐 | POST | `/access/role/assign` | Assign access types to a role |

### Category

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/category` | Create category |
| 🔐 | GET | `/category` | List categories |
| 🔐 | GET | `/category/:id` | Get category by id |
| 🔐 | PUT | `/category/:id` | Update category |
| 🔐 | DELETE | `/category/:id` | Delete category |

### Product

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/product` | Create product (JSON or `multipart/form-data`; optional file field `image`) |
| 🔐 | GET | `/product` | List products |
| 🔐 | GET | `/product/:id` | Get product by id |
| 🔐 | PUT | `/product/:id` | Update product (JSON or multipart; optional `image`) |
| 🔐 | DELETE | `/product/:id` | Delete product |

### Product image (standalone)

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/product/:productId/image` | Add product image |
| 🔐 | GET | `/product/:productId/image` | List images for a product |
| 🔐 | GET | `/product/image/:id` | Get product image by id |
| 🔐 | PUT | `/product/image/:id` | Update product image |
| 🔐 | DELETE | `/product/image/:id` | Delete product image |

### Cart

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | GET | `/cart` | Get current user’s cart |
| 🔐 | DELETE | `/cart` | Delete cart |
| 🔐 | POST | `/cart/item` | Add cart item |
| 🔐 | GET | `/cart/item` | List cart items |
| 🔐 | PUT | `/cart/item/:id` | Update cart item |
| 🔐 | DELETE | `/cart/item/:id` | Remove cart item |

### Order & payment

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/order` | Create order |
| 🔐 | GET | `/order` | List orders |
| 🔐 | GET | `/order/:id` | Get order by id |
| 🔐 | PUT | `/order/:id` | Update order |
| 🔐 | DELETE | `/order/:id` | Delete order |
| 🔐 | POST | `/order/payment` | Create payment |
| 🔐 | GET | `/order/payment` | List payments |
| 🔐 | GET | `/order/payment/:id` | Get payment by id |
| 🔐 | PUT | `/order/payment/:id` | Update payment |

### Review

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/review` | Create review |
| 🔐 | GET | `/review` | List reviews |
| 🔐 | GET | `/review/:id` | Get review by id |
| 🔐 | PUT | `/review/:id` | Update review |
| 🔐 | DELETE | `/review/:id` | Delete review |

### Inventory

| Mark | Method | Path | Description |
|------|--------|------|-------------|
| 🔐 | POST | `/inventory` | Create inventory |
| 🔐 | GET | `/inventory` | List inventories |
| 🔐 | GET | `/inventory/:id` | Get inventory by id |
| 🔐 | PUT | `/inventory/:id` | Update inventory |
| 🔐 | DELETE | `/inventory/:id` | Delete inventory |

---

## Data model (entity relations)

| Entity                         | Relation Type            | Notes                                 |
| ------------------------------ | ------------------------ | ------------------------------------- |
| User → Role                    | Many-to-One              | Each user has one role                |
| User → Outlet                  | One-to-Many              | Only sellers own outlets              |
| Outlet → Product               | One-to-Many              | Each outlet can have many products    |
| Product → Inventory            | One-to-One               | Tracks stock per outlet               |
| Category → Product             | One-to-Many              | Hierarchical categories possible      |
| Order → OrderItem              | One-to-Many              | Each order can have multiple products |
| OrderItem → Product            | Many-to-One              | Each item references a product        |
| OrderItem → Outlet             | Many-to-One              | Which outlet fulfilled item           |
| Role → AccessRole → AccessType | Many-to-Many w/ metadata | Permissions per role                  |
