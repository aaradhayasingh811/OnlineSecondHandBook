# NovelNest - Second Hand Book Store

## Overview
NovelNest is a second-hand book marketplace that allows users to buy, sell, and review books. Sellers can list books, and buyers can browse, purchase, and manage orders. The platform includes authentication, secure payments via Stripe, and features such as wishlists, reviews, and a seller dashboard.

## Tech Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces
- **React Router**: For client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **MUI (Material UI)**: Component library for UI styling
- **Emotion (Styled & React)**: For styling components
- **Framer Motion**: For animations
- **GSAP**: Animation library
- **React Toastify**: Notifications
- **React Icons & Lucide React**: Icon libraries
- **React Intersection Observer**: For lazy loading & viewport tracking
- **Axios**: HTTP client
- **@react-oauth/google**: Google authentication
- **@stripe/react-stripe-js & @stripe/stripe-js**: Stripe integration for payments

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken (JWT)**: Authentication
- **Cookie Parser**: Handling cookies
- **CORS**: Cross-Origin Resource Sharing
- **Dotenv**: Environment variable management
- **Express Validator**: Input validation
- **Multer & Multer-Storage-Cloudinary**: File uploads
- **Cloudinary**: Cloud-based image storage
- **Nodemailer**: Email service
- **Stripe**: Payment processing
- **UUID**: Unique ID generation

### DevOps & Deployment
- **Git**: Version control
- **Vercel**: Deployment platform

## Features

### Authentication
- User registration & login
- Seller registration & login
- Google authentication support
- JWT-based authentication

### Book Management
- Add, edit, and delete books (sellers only)
- View all books
- Search & filter books
- View books from a specific seller

### Cart & Wishlist
- Add & remove books from cart
- Manage cart quantities
- Wishlist management

### Orders
- Create, view, and cancel orders
- Sellers can view and update order status

### Reviews
- Add, edit, and delete reviews
- View book and seller reviews

### Payments
- Secure payments via Stripe
- Generate payment intent

## API Routes

### Book Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/all-books` | Retrieve all books |
| GET | `/books/:id` | Get book details |
| POST | `/add-books` | Add new book (seller only) |
| PUT | `/edit-books/:bookId` | Edit book details |
| GET | `/filter-books` | Filter books |
| GET | `/search` | Search books |
| GET | `/all-books/seller` | View seller's books |

### Cart Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/add-to-cart/:bookId` | Add book to cart |
| GET | `/cart` | View cart items |
| PUT | `/cart-update/:bookId` | Update cart quantity |
| DELETE | `/remove-from-cart/:bookId` | Remove book from cart |

### Order Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/create-order` | Create an order |
| GET | `/all-orders` | View user orders |
| GET | `/all-orders-seller` | View seller orders |
| PUT | `/update-status/:orderId` | Update order status (seller only) |
| DELETE | `/cancel-order/:orderId` | Cancel order |

### Review Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/all-review/:bookId` | Get book reviews |
| GET | `/all-review-seller` | Get seller reviews |
| POST | `/add-review/:bookId` | Add review |
| PUT | `/edit-review/:bookId` | Edit review |
| DELETE | `/delete-review/:bookId` | Delete review |

### Seller Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/register-seller` | Register seller |
| POST | `/login-seller` | Login seller |
| PUT | `/update-seller` | Update seller profile |
| GET | `/logout-seller` | Logout seller |
| GET | `/get-profile-seller` | Get seller profile |

### User Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| PUT | `/update-profile` | Update user profile |
| GET | `/logout` | Logout user |
| GET | `/profile` | Get user profile |

### Wishlist Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/is-in-wishlist/:bookId` | Check if book is in wishlist |
| POST | `/add-to-wishlist/:bookId` | Add book to wishlist |
| DELETE | `/delete-from-wishlist/:bookId` | Remove from wishlist |
| GET | `/all-wishlist` | View wishlist |

### Payment Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/create-payment-intent` | Create Stripe payment intent |

## Frontend Pages & Components

### Pages
- **Home** (`/`)
- **About** (`/about`)
- **Auth (Login/Register)** (`/login`, `/register`)
- **Book Details** (`/book/:id`)
- **Cart** (`/cart`)
- **All Books** (`/all-books`)
- **Checkout (Orders)** (`/checkout`)
- **Payment** (`/payment`)
- **User Dashboard** (`/user-dashboard`)
- **Seller Login/Register** (`/loginSeller`, `/registerSeller`)
- **Seller Dashboard** (`/seller/dashboard`)

### Components
- **Navbar**
- **Footer**
- **Stripe Payment**
- **Toast Notifications**
- **Animations & Lazy Loading**

## Deployment
- **Frontend**: Vercel
- **Backend**: Hosted on cloud (MongoDB Atlas for database)
- **CI/CD**: GitHub Actions for version control

## Conclusion
NovelNest provides an intuitive platform for second-hand book transactions with secure payments, authentication, and seller-specific functionalities. It ensures a smooth user experience with a modern tech stack and responsive design.