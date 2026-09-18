# Sanaa API Contract

Base URL:

/api/v1

## Health

### GET /health

Authentication:
Public

Response:

{
  "success": true,
  "message": "Sanaa API is healthy",
  "data": {
    "service": "sanaa-api",
    "api": "healthy",
    "database": "connected",
    "environment": "development"
  }
}
# Authentication

## POST /auth/register

Authentication:
Public

Request:

{
  "name": "Ian Test",
  "email": "ian@sanaa.test",
  "password": "SanaaTest123"
}

Success:
201

Response:

{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {},
    "token": "..."
  }
}

---

## POST /auth/login

Authentication:
Public

Request:

{
  "email": "ian@sanaa.test",
  "password": "SanaaTest123"
}

Success:
200

---

## GET /auth/me

Authentication:
Bearer token required

Header:

Authorization: Bearer <token>

Success:
200

Unauthorized:
401