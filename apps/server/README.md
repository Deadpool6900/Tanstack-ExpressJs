# Server

This is the backend server for the application, built with [Bun](https://bun.sh), Express, Prisma ORM ,Zod and TypeScript .

**Note:** This specific folder is a part of a turborepo, if you aren't using turborepo plz add types manually from `@types/` packages. 

---

## 😊 Getting Started

Follow these steps to get the server running locally.

### 1. Installation

Install the project dependencies using Bun:

```bash
bun install
```

### 2. Environment Variables

This project requires several environment variables to run correctly. Create a `.env` file in the `apps/server` directory by copying the example below.

```env
# .env

# --- DATABASE ---
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# --- AUTHENTICATION ---
JWT_SECRATE_KEY="your-super-secret-jwt-key"
SESSION_SECRET="your-super-secret-session-key"

# --- GOOGLE OAUTH ---
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# --- GOOGLE MAIL (for sending emails) ---
GMAIL="your-email@gmail.com"
GOOGLE_APP_PASSWORD="your-google-app-password"

# --- CLIENT ---
FRONTEND_URL="http://localhost:3000"
```

**Note:** plz replace the placeholder (you might forgot 😅)

### 3. Run the Development Server

Start the server in development mode with hot-reloading:

```bash
bun run dev
```

The server will be running on the port either specified or 5001.

---

## 🐰 Available Scripts

-   `bun run dev`: Starts the development server with hot-reloading.
-   `bun run test`: Runs the test suite using Vitest.
-   `bun run lint`: Checks the code for formatting and linting issues with Biome.
-   `bun run lint:fix`: Automatically fixes linting and formatting issues.

**Note:** plz dont use lint:fix without reviewing the changes first it will cause unexpected shit .

---

## 📁 Project Structure

The source code is organized like This:

```
apps/server/
├── prisma/
│   └── schema.prisma     # Prisma schema for database models
└── src/
    ├── index.ts          # Main application entry point
    ├── controllers/      # Handles business logic for routes
    ├── middleware/       # Express middleware (e.g., auth, error handling)
    ├── routes/           # API route definitions
    └── utils/            # Utility functions, helpers, and Prisma client instance
```

---

## ✨ Code Quality with Biome

This project uses [Biome](https://biomejs.dev/) for linting and formatting to ensure code consistency and quality. You can check your code by running `bun run lint`.

made with ❤️ by @Kedar0023_