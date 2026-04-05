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

- AWS Amplify Hosting
- AWS EC2
- Nginx
- PM2
- AWS RDS MySQL
- Namecheap DNS
- Let's Encrypt / Certbot

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

### Frontend

- AWS Amplify Hosting
- current Amplify URL: `https://main.dh6pcwu1dbgpd.amplifyapp.com`

### Backend

- AWS EC2
- Node.js app managed with `pm2`
- Nginx reverse proxy in front of Express
- public API domain: `https://api.irinatassinari.com`

### Database

- AWS RDS MySQL
- database name: `question_randomiser`

### DNS

- domain registrar: Namecheap
- API subdomain points to EC2 public IP

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

### Backend `.env` example for EC2 + RDS

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
CORS_ORIGINS=http://localhost:8080,https://main.dh6pcwu1dbgpd.amplifyapp.com
```

### Frontend `.env` example for local development

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT_MS=10000
```

### Amplify environment variables

```env
VITE_API_URL=https://api.irinatassinari.com
VITE_API_TIMEOUT_MS=10000
```

## Local Development

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

### Install dependencies

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

Useful commands:

```bash
pm2 status
pm2 logs question-randomiser-backend --lines 100
pm2 restart question-randomiser-backend
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

## HTTPS for API

The production frontend is hosted on HTTPS, so the backend API must also be served over HTTPS to avoid mixed-content errors.

### DNS

In Namecheap, create:

- `A Record`
  - `Host`: `api`
  - `Value`: EC2 public IP
  - `TTL`: `Automatic`

### Open EC2 ports

EC2 security group should allow:

- `SSH` on `22`
- `HTTP` on `80`
- `HTTPS` on `443`

### Install certificate with Certbot

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.irinatassinari.com
```

After success, the API should respond on:

```txt
https://api.irinatassinari.com
https://api.irinatassinari.com/questions
```

## Amplify Frontend Setup

Recommended Amplify settings:

- deploy type: GitHub
- branch: `main`
- monorepo: enabled
- monorepo root directory: `frontend`
- build command: `npm run build`
- build output directory: `dist`

Recommended environment variables:

```env
VITE_API_URL=https://api.irinatassinari.com
VITE_API_TIMEOUT_MS=10000
```

### SPA rewrites and redirects

Use this rewrite rule:

```json
[
  {
    "source": "/<*>",
    "status": "404-200",
    "target": "/index.html"
  }
]
```

## Production Checklist

- `https://api.irinatassinari.com/` returns `Server is running`
- `https://api.irinatassinari.com/questions` returns JSON
- Amplify frontend loads quiz questions
- registration and sign in work from Amplify
- backend `CORS_ORIGINS` includes the current frontend origin
- PM2 process is online
- Nginx is active

## Notes

- Local frontend can use `http://localhost:3000` without HTTPS.
- Production frontend on Amplify requires the API to be available over HTTPS.
- Old Render and Cloudflare deployment URLs are no longer part of the active production setup.

## Postman

Backend Postman documentation:

https://documenter.getpostman.com/view/53300232/2sBXihrYoe
