# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body:

```json
{
    "email": "tester@gmail.com",
    "password": "password123;",
    "name": "User Test"
}
```

Reponse Body Success:

```json
{
    "data": {
        "email": "tester@gmail.com",
        "name": "User Test"
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
    "email": "tester@gmail.com",
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
    "error": "Wrong email or password"
}
```

## Update User API

## Get Users API

## Get User by Id API

## Logout User API
