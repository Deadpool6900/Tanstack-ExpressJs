# Vite + Express + TypeScript Monorepo

This is a full-stack starter template featuring a modern, type-safe, and high-performance technology stack. It's structured as a monorepo managed by Turborepo and powered by Bun.

---

## ✨ Features

- **Monorepo Ready:** Managed with [Turborepo](https://turbo.build/repo) for scalable project management.
- **Powered by Bun:** Uses [Bun](https://bun.sh) as the package manager, runtime, and bundler for incredible speed.
- **Type-Safe:** End-to-end TypeScript for robust and maintainable code.
- **Modern Frontend:** A [Vite](https://vitejs.dev/) + [React](https://react.dev/) client with [TanStack Router](https://tanstack.com/router) for type-safe routing and [Shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components.
- **Fast Backend:** An [Express.js](https://expressjs.com/) server running on Bun, with [Prisma](https://www.prisma.io/) for database access and [Zod](https://zod.dev/) for validation.
- **Unified Code Quality:** [Biome](https://biomejs.dev/) for consistent formatting and linting across the entire project.

---

## 🚀 Getting Started

Follow these steps to get the entire application running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vite-express-ts.git
cd vite-express-ts
```

### 2. Install Dependencies

Install all dependencies for the client and server from the root of the project:

```bash
bun install
```

### 3. Set Up Environment Variables

This project requires environment variables for both the client and server.

- **Server:** Navigate to `apps/server` and create a `.env` file. For detailed instructions, see the [Server README](./apps/server/README.md).
- **Client:** Navigate to `apps/client` and create a `.env` file. For detailed instructions, see the [Client README](./apps/client/README.md).

### 4. Run the Development Servers

Start both the client and server concurrently from the root directory:

```bash
bun run dev
```

- The **Client** will be available at `http://localhost:3000`.
- The **Server** will be available at `http://localhost:5001`.

---

## 📁 Project Structure

This monorepo contains two main applications:

```
.
├── apps/
│   ├── client/  # Vite + React Frontend
│   └── server/  # Bun + Express Backend
├── packages/
│   ├── types/   # Shared TypeScript types
│   └── ...
└── package.json
```

For a detailed breakdown of each application, please refer to their respective README files:

- [\*\*Client README](./apps/client/README.md)\*\*
- [\*\*Server README](./apps/server/README.md)\*\*

---

## 🛠️ Available Root Scripts

- `bun run dev`: Starts both the client and server in development mode with hot-reloading.
- `bun run build`: Builds both applications for production.
- `bun run lint`: Lints and checks formatting for the entire monorepo.

---

Made with ❤️ by @Kedar0023