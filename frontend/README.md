# Coffee Staff Management – Frontend

Admin Dashboard frontend for the Coffee Staff Management system.

## Tech Stack

- ⚡ Vite + React + TypeScript
- 🎨 Tailwind CSS
- 🧩 shadcn/ui + Radix UI
- 🗂 Redux Toolkit
- 🔄 TanStack React Query
- 🔐 JWT Authentication
- 🌗 Dark / Light Mode

## Project Structure

src/
├── app/ # App setup (router, store, query client)
├── features/ # Feature-based modules (auth, dashboard, etc.)
├── shared/ # Shared components, api, utils
├── components/ui/ # shadcn/ui components
├── lib/ # Helper utilities


## Getting Started

### Install dependencies

```bash
npm install
Run development server
npm run dev
The application will be available at:

http://localhost:5173
Environment Variables
Create a .env file in the project root:

VITE_API_URL=http://localhost:5136/api/v1
Authentication
Only ADMIN users are allowed to log in

JWT token is stored in localStorage

Protected routes are handled by RequireAuth

UI Guidelines
Use shadcn/ui for all UI components

Avoid writing custom CSS unless necessary

Prefer composition and variants over duplicated components

Author
Coffee Staff Management Team