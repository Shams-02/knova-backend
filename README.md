# KnovaTwin Backend

## Project Description

The backend for the KnovaTwin project provides API endpoints for user authentication, data persistence, affiliate program management, feedback collection, and potentially course data management. It is built using Node.js, Express.js, PostgreSQL, and Prisma ORM, and is designed to integrate seamlessly with the existing frontend and be deployable on Vercel.

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (v18+)
*   npm or yarn
*   PostgreSQL
*   Prisma CLI

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/aixnetwork/Knova-
    cd Knova-
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

## Environment Variables Setup

Create a `.env` file in the root directory with the following environment variables:

```
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
JWT_SECRET="your-secret-key"
NODE_ENV="development" # or "production"
CORS_ORIGIN="http://localhost:3000" # Replace with your frontend origin
```

*   `DATABASE_URL`: PostgreSQL connection string.
*   `JWT_SECRET`: Secret key for signing JWT tokens.  Must be a strong, randomly generated string.
*   `NODE_ENV`: Set to "production" in the production environment.
*   `CORS_ORIGIN`: The origin of the frontend application.

## Database Setup

1.  Create a PostgreSQL database.
2.  Update the `DATABASE_URL` environment variable with your database connection string.
3.  Run Prisma migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

4.  (Optional) Seed the database:

    ```bash
    npx prisma db seed
    ```

## How to Run the Server

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Build for production:

    ```bash
    npm run build # or yarn build
    ```

3.  Start the production server:

    ```bash
    npm start # or yarn start
    ```

## API Endpoints Documentation

### Authentication

*   `POST /auth/register`: Registers a new user. Accepts `email`, `password`, and `name` in the request body. Returns a JWT token upon successful registration.
*   `POST /auth/login`: Logs in an existing user. Accepts `email` and `password` in the request body. Returns a JWT token upon successful login.
*   `GET /auth/me`: Retrieves the currently authenticated user's profile. Requires a valid JWT token in the `Authorization` header. Returns user data.

### Affiliate Program

*   `GET /affiliate`: Retrieves the affiliate information for the currently authenticated user. Requires a valid JWT token. Returns affiliate stats, referral link, and recent referrals.
*   `GET /affiliate/referrals`: Retrieves a list of referrals for the currently authenticated user. Requires a valid JWT token. Supports pagination.

### Feedback

*   `POST /feedback`: Creates a new feedback entry. Accepts `type` and `message` in the request body, along with optional user information if not logged in. If the user is authenticated, the `userId` should be automatically populated.
*   `GET /feedback`: Retrieves a list of feedback entries (Admin/SuperAdmin only). Supports filtering by `status` and pagination.
*   `GET /feedback/:id`: Retrieves a specific feedback entry by ID (Admin/SuperAdmin only).
*   `PATCH /feedback/:id`: Updates the status of a feedback entry (Admin/SuperAdmin only). Accepts `status` in the request body.

### Courses (Optional)

*   `GET /courses`: Retrieves a list of courses.
*   `GET /courses/:id`: Retrieves a specific course by ID.

### Admin/SuperAdmin

*   `GET /admin/users`: Retrieves a list of users. Supports pagination and filtering.
*   `GET /admin/users/:id`: Retrieves a specific user by ID.
*   `PATCH /admin/users/:id`: Updates user information (e.g., role).

### Health Check

*   `GET /health`: Returns a 200 OK status if the server is running.

## Project Structure

```
backend-template/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── affiliateController.js
│   │   ├── feedbackController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── affiliateRoutes.js
│   │   ├── feedbackRoutes.js
│   │   ├── userRoutes.js
│   │   └── courseRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── affiliateService.js
│   │   ├── feedbackService.js
│   │   └── userService.js
│   ├── utils/
│   │   ├── apiError.js
│   │   ├── apiResponse.js
│   │   ├── logger.js
│   │   └── jwtUtils.js
│   ├── app.js
│   └── server.js
├── .env
├── .eslintrc.js
├── .gitignore
├── package.json
├── README.md
└── vercel.json
```

## Vercel Deployment Instructions

1.  Create a Vercel account and install the Vercel CLI.
2.  Link your project to Vercel:

    ```bash
    vercel link
    ```

3.  Deploy your project:

    ```bash
    vercel deploy --prod
    ```

4.  Set the environment variables in the Vercel dashboard.

## Contributing Guidelines

(Optional) Add contributing guidelines if you want to allow others to contribute to your project.
