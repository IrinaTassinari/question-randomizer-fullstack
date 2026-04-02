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

### Infrastructure

- AWS RDS MySQL
- AWS EC2
- Nginx
- PM2
- AWS Amplify Hosting

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

## Current Deployment

### Database

- AWS RDS MySQL
- database name: `question_randomiser`

### Backend

- AWS EC2
- Node.js app managed with `pm2`
- Nginx reverse proxy in front of Express

### Frontend

- AWS Amplify Hosting
- build root: `frontend`

## Environment Variables

### Backend `.env` example for local development

```env
PORT=3000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME_DEV=question_randomiser
DB_NAME_TEST=database_test
DB_NAME_PROD=question_randomiser
DB_DIALECT=mysql

JWT_SECRET=your_secret_key
```

### Backend `.env` example for AWS EC2 + RDS

```env
PORT=3000
NODE_ENV=production

DB_HOST=your-rds-endpoint
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=your_rds_password
DB_NAME_PROD=question_randomiser
DB_DIALECT=mysql

DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
DB_CONNECT_TIMEOUT_MS=10000
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_POOL_ACQUIRE_MS=30000
DB_POOL_IDLE_MS=10000
DB_RETRY_MAX=3

JWT_SECRET=your_secret_key
CORS_ORIGINS=https://your-frontend-domain
```

### Frontend `.env` example for local development

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT_MS=10000
```

### Frontend environment variables for AWS Amplify

```env
VITE_API_URL=https://your-api-domain
VITE_API_TIMEOUT_MS=10000
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
npm run db:migrate
npm run dev
```

Backend runs on:

```txt
http://localhost:3000
```

## Database Setup

### Run migrations

```bash
cd backend
npm run db:migrate
```

### Seed default questions

The seed requires at least one existing user in `auth_users`.

Recommended order:

1. run migrations
2. register at least one user, ideally a `teacher`
3. run the seed

```bash
cd backend
npm run db:seed:all
```

## EC2 Backend Setup

### Install dependencies on EC2

```bash
sudo dnf update -y
sudo dnf install -y nodejs git nginx
sudo npm install -g pm2
```

### Start backend with PM2

```bash
cd ~/question-randomizer-fullstack/backend
npm install
pm2 start app.js --name question-randomiser-backend
pm2 save
```

### Nginx reverse proxy

Example config:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After saving the config:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Amplify Frontend Setup

Recommended Amplify settings for this repository:

- deploy type: GitHub
- branch: `main`
- monorepo: enabled
- monorepo root directory: `frontend`
- build command: `npm run build`
- build output directory: `dist`

Recommended environment variables:

```env
VITE_API_URL=https://your-api-domain
VITE_API_TIMEOUT_MS=10000
```

## Important Notes

- The frontend can work against an HTTP backend only in local development.
- A production frontend hosted on Amplify uses HTTPS, so the backend should also be exposed over HTTPS to avoid mixed-content errors.
- For production, the recommended setup is:
  - frontend on Amplify
  - backend on EC2 behind Nginx
  - database on RDS
  - custom domain for the API, for example `api.yourdomain.com`
  - SSL certificate for the API domain

## Verification Checklist

- `http://localhost:3000/` returns `Server is running` in local development
- `GET /questions` returns JSON from MySQL
- frontend can register and sign in
- teacher can create questions
- Amplify frontend points to the correct backend URL
- backend `CORS_ORIGINS` matches the frontend production domain

## Postman

Backend Postman documentation:

https://documenter.getpostman.com/view/53300232/2sBXihrYoe
