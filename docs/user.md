# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body:

```json
{
    "email": "admin@gmail.com",
    "password": "password123;",
    "name": "Admnistrator"
}
```

Reponse Body Success:

```json
{
    "data": {
        "email": "admin@gmail.com",
        "name": "Administrator"
    }
}
```

Response Body Error:

```json
{
    "error": "Email is taken"
}
```

## Login User API

Endpoint : POST /api/users/authenticate

Request Body:

```json
{
    "email": "admin@gmail.com",
    "password": "password123;"
}
```

Response Body Success:

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:

```json
{
    "error": "Wrong Password"
}
```

## Update User API

## Get Users API

## Get User by Id API

## Logout User API
