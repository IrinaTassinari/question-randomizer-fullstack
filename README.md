# Biology Q&A Bot

Fullstack biology question randomizer with role-based authentication and a shared MySQL question bank.

## Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- shadcn/ui

### Backend

- Node.js
- Express
- MySQL
- Sequelize
- sequelize-cli
- JWT
- bcrypt
- dotenv
- cors

## Project Structure

```bash
question_randomiser/
  frontend/
    src/
    package.json
    vite.config.ts
  backend/
    config/
    controllers/
    middlewares/
    migrations/
    models/
    routes/
    seeders/
    utils/
    app.js
    package.json
  .gitignore
  README.md
```

## Features

### Frontend

- browse biology categories
- generate random questions by category and difficulty
- register and sign in
- view profile with role
- teacher-only access to add new questions

### Backend

- user registration
- user sign in
- JWT token generation
- protected profile route
- role-based authorization (`teacher` / `student`)
- MySQL-based storage for users and questions

## Roles

- `teacher` can add new questions
- `student` can browse and answer questions, but cannot add them

## Frontend Routes

- `/` - home page
- `/quiz/:category` - quiz page
- `/add` - add question page, teacher only
- `/register` - registration page
- `/signin` - sign in page
- `/profile` - user profile page

## Backend API Routes

- `POST /auth/register`
- `POST /auth/signin`
- `GET /auth/profile`
- `GET /questions`
- `POST /questions`

## Production Links

- Frontend URL: https://8747de93.question-randomizer-fullstack.pages.dev/
- Backend health URL: https://question-randomizer-fullstack.onrender.com/
- Backend questions API: https://question-randomizer-fullstack.onrender.com/questions

## Environment Variables

### Backend `.env` example for local development

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME_DEV=auth_jwt_db
DB_NAME_TEST=database_test
DB_NAME_PROD=database_production
DB_DIALECT=mysql
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### Backend environment variables for cloud MySQL / Render

```env
NODE_ENV=production
PORT=10000
DB_HOST=your-aiven-host
DB_PORT=your-aiven-port
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME_PROD=defaultdb
DB_DIALECT=mysql
JWT_SECRET=your_secret_key
CORS_ORIGINS=https://your-project.pages.dev,https://yourdomain.com
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
DB_CONNECT_TIMEOUT_MS=10000
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_POOL_ACQUIRE_MS=30000
DB_POOL_IDLE_MS=10000
DB_RETRY_MAX=3
```

### Frontend `.env` example

```env
VITE_API_URL=http://localhost:3000
```

### Frontend production `.env` example

```env
VITE_API_URL=https://question-randomizer-fullstack.onrender.com
VITE_API_TIMEOUT_MS=10000
```

### Backend CORS for production

```env
CORS_ORIGINS=https://your-project.pages.dev,https://yourdomain.com
```

## Local Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:8080
```

### Backend

```bash
cd backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```

Backend runs on:

```txt
http://localhost:3000
```

## Database

Questions are stored in MySQL, not in `localStorage`.

This project uses:

- migrations to create tables
- seeders to load the initial biology question bank
- Aiven MySQL as the cloud database in production

## Deployment

### Backend

- deployed on Render
- connected to Aiven MySQL

### Frontend

- deployed on Cloudflare Pages
- frontend URL: https://8747de93.question-randomizer-fullstack.pages.dev/
- set `VITE_API_URL` to the Render backend URL

## Deploy Frontend To Cloudflare Pages

Cloudflare Pages can host the Vite frontend directly. This project is a SPA, and Cloudflare Pages serves SPA routes by default when there is no top-level `404.html`.

### Recommended setup

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Build output directory: `dist`

### Frontend environment variable in Cloudflare

Set this in Pages project settings:

```env
VITE_API_URL=https://your-backend-url
```

### Backend requirement

If the backend stays on Render or another host, add the Cloudflare frontend domain to backend CORS:

```env
CORS_ORIGINS=https://your-project.pages.dev,https://yourdomain.com
```

### Important

- The current backend uses `Express + Sequelize + MySQL`.
- The easiest deployment path is: frontend on Cloudflare Pages, backend on Render.
- Moving the backend itself to Cloudflare is a separate migration and would typically require adapting it for Workers and a Cloudflare-supported database connection flow such as Hyperdrive.

## Notes

- if you seed the database, quiz questions are loaded from MySQL
- if the database is empty, the quiz page will show `No questions found for this category and difficulty.`
- CORS should be restricted to the frontend production domain after deployment

## Postman

Backend Postman documentation:

https://documenter.getpostman.com/view/53300232/2sBXihrYoe
