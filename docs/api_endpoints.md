# API Endpoints Documentation

## Authentication

### POST /auth/register

Registers a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (Success):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/login

Logs in an existing user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /auth/me

Retrieves the currently authenticated user's profile.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "role": "USER"
}
```

## Affiliate Program

### GET /affiliate

Retrieves the affiliate information for the currently authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success):**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "referralLink": "https://example.com/referral/uuid",
  "totalEarnings": "0.00",
  "nextPayout": "0.00",
  "nextPayoutDate": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /affiliate/referrals

Retrieves a list of referrals for the currently authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

*   `page`: Page number (optional)
*   `limit`: Number of items per page (optional)

**Response (Success):**

```json
{
  "referrals": [
    {
      "id": "uuid",
      "affiliateId": "uuid",
      "referredUserId": "uuid",
      "referredEmail": "referred@example.com",
      "status": "PENDING",
      "commission": "0.00",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

## Feedback

### POST /feedback

Creates a new feedback entry.

**Request Body:**

```json
{
  "type": "IMPROVEMENT",
  "message": "This is a feedback message.",
  "userName": "Guest User",
  "userEmail": "guest@example.com"
}
```

**Response (Success):**

```json
{
  "id": "uuid",
  "userId": null,
  "userName": "Guest User",
  "userEmail": "guest@example.com",
  "type": "IMPROVEMENT",
  "message": "This is a feedback message.",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "NEW",
  "userAgent": "Mozilla/5.0..."
}
```

### GET /feedback (Admin/SuperAdmin only)

Retrieves a list of feedback entries.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

*   `status`: Filter by status (optional)
*   `page`: Page number (optional)
*   `limit`: Number of items per page (optional)

**Response (Success):**

```json
{
  "feedback": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userName": "John Doe",
      "userEmail": "user@example.com",
      "type": "IMPROVEMENT",
      "message": "This is a feedback message.",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "status": "NEW",
      "userAgent": "Mozilla/5.0..."
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### GET /feedback/:id (Admin/SuperAdmin only)

Retrieves a specific feedback entry by ID.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success):**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "userName": "John Doe",
  "userEmail": "user@example.com",
  "type": "IMPROVEMENT",
  "message": "This is a feedback message.",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "NEW",
  "userAgent": "Mozilla/5.0..."
}
```

### PATCH /feedback/:id (Admin/SuperAdmin only)

Updates the status of a feedback entry.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "status": "IN_PROGRESS"
}
```

**Response (Success):**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "userName": "John Doe",
  "userEmail": "user@example.com",
  "type": "IMPROVEMENT",
  "message": "This is a feedback message.",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "IN_PROGRESS",
  "userAgent": "Mozilla/5.0..."
}
```

## Courses (Optional)

### GET /courses

Retrieves a list of courses.

**Response (Success):**

```json
[
  {
    "id": "uuid",
    "topic": "Mathematics",
    "description": "Introduction to Mathematics"
  }
]
```

### GET /courses/:id

Retrieves a specific course by ID.

**Response (Success):**

```json
{
  "id": "uuid",
  "topic": "Mathematics",
  "description": "Introduction to Mathematics"
}
```

## Admin/SuperAdmin

### GET /admin/users

Retrieves a list of users.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

*   `page`: Page number (optional)
*   `limit`: Number of items per page (optional)

**Response (Success):**

```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "role": "USER"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### GET /admin/users/:id

Retrieves a specific user by ID.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "role": "USER"
}
```

### PATCH /admin/users/:id

Updates user information (e.g., role).

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "role": "ADMIN"
}
```

**Response (Success):**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "role": "ADMIN"
}
```

## Health Check

### GET /health

Returns a 200 OK status if the server is running.

**Response (Success):**

```
HTTP/1.1 200 OK
```