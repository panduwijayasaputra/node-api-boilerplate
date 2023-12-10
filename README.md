# Node.js Express Typescript API Boilerplate

This repository contains a Node.js API built with Express and TypeScript, using Prisma as the ORM, PostgreSQL as the database, Joi for validation, Jest for testing with Babel, and authentication packages including Bcrypt and JSON Web Tokens.

## Getting Started

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [PostgreSQL](https://www.postgresql.org/)

### Instalation

1. Clone the repository:

```bash
git clone https://github.com/panduwijayasaputra/node-api-boilerplate.git
```

2. Install the dependencies:

```bash
cd node-api-boilerplate
npm install
```

3. Set up your PostgreSQL database

4. Update the DATABASE_URL, PORT, and JWT_SECRET in the .env.development file

5. Run the migrations:

```bash
npx prisma migrate dev
```

6. Start the dev server:

```bash
npm run dev
```

## Configuration

The .env file contains configuration variables, including the database URL, server port, and other environment-specific settings.

## Project Structure

-   src/: Contains the source code for the project.
    -   controllers/: Handles business logic.
    -   middlewares/: Custom middleware functions.
    -   models/: Prisma models and database schema.
    -   routes/: Express route handlers.
    -   services/: Business logic separated from controllers.
    -   tests/: Jest test files.
    -   utils/: Utility functions.

## Testing

Run tests using Jest:

```bash
npm test
```

## API Documentation

API documentation can be found in the **/docs** directory

## Dependencies

-   [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
-   [Typescript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
-   [Prisma](https://www.prisma.io/): Database toolkit for TypeScript and Node.js.
-   [Joi](https://joi.dev/): Object schema validation.
-   [Jest](https://jestjs.io/): Delightful JavaScript testing.
-   [Bcrypt](https://www.npmjs.com/package/bcrypt): Password hashing library.
-   [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation.

## Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).
