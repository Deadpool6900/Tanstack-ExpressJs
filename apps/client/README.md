# Client

This is the frontend client for the application, built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Shadcn/ui](https://ui.shadcn.com/).

---

## 😊 Getting Started

Follow these steps to get the client running locally.

### 1. Installation

Install the project dependencies using Bun:

```bash
bun install
```

### 2. Environment Variables

This project may require environment variables to connect to the backend API. Create a `.env` file in the `apps/client` directory.

```env
# .env

# --- API ---
VITE_API_BASE_URL="http://localhost:5001"
```

**Note:** Ensure the `VITE_API_BASE_URL` matches the running server's address.

### 3. Run the Development Server

Start the client in development mode with hot-reloading:

```bash
bun run dev
```

The client will be running on `http://localhost:3000` by default.

---

## 🐰 Available Scripts

-   `bun run dev`: Starts the development server with hot-reloading.
-   `bun run build`: Builds the app for production.
-   `bun run lint`: Checks the code for formatting and linting issues with Biome.
-   `bun run lint:fix`: Automatically fixes linting and formatting issues.

---

## 📁 Project Structure

The source code is organized like This:

```
apps/client/
└── src/
    ├── main.tsx          # Main application entry point
    ├── App.tsx           # Root React component
    ├── router.tsx        # TanStack Router configuration
    ├── components/       # Reusable UI components
    │   ├── blocks/       # Larger, composite components
    │   ├── layout/       # Layout components (Navbar, Sidebar)
    │   └── ui/           # Base UI components (Shadcn)
    ├── hooks/            # Custom React hooks
    ├── lib/              # Utility functions and library instances (e.g., axios)
    └── routes/           # Route components managed by TanStack Router
```

---

## ✨ Code Quality with Biome

This project uses [Biome](https://biomejs.dev/) for linting and formatting to ensure code consistency and quality. You can check your code by running `bun run lint`.

made with ❤️