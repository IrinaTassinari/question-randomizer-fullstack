import express from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import sequelize from './config/db.js';
import { errorHandler } from './controllers/errorMiddleware.js';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import loggerMiddleware from './middlewares/loggerMiddleware.js'
import questionRoutes from "./routes/questionRoutes.js";


dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }

  if (!isProduction && /^(http:\/\/localhost|http:\/\/127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return true;
  }

  if (!allowedOrigins.length) {
    return !isProduction;
  }

  return allowedOrigins.includes(origin);
}

app.use(express.json())

//origin в cors должен указывать адрес фронтенда, который отправляет запросы, а не адрес самого backend

app.use(
  cors(
    {
      origin(origin, callback) {
        if (isOriginAllowed(origin)) {
          return callback(null, true);
        }

        const corsError = new Error(`CORS origin not allowed: ${origin}`);
        corsError.status = 403;
        return callback(corsError);
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      optionsSuccessStatus: 204,
    }
  )
)


//подключаем наш middleware для логирования запросов - говорит - используй эту ф-ю loggerMiddleware - это мы так middleware вызываем и в скобках - потому что не хотим, чтобы она сразу вызывалась
app.use(loggerMiddleware)

//подключаем марщруты авторизации
//authRoutes - объект, который будет содержать маршруты
app.use('/auth', authRoutes)
app.use("/questions", questionRoutes);


// sequelize.authenticate()
//     .then(() => console.log('DB connected'))
//     .catch(err => console.error('DB error:', err))


//простой тестовый маршрут
app.get('/', (_, res) => {
    res.send('Server is running')
})

app.use(errorHandler)

// // Запускаем сервер
// сервер все равно запустится, даже если БД недоступна, потому что app.listen() идет отдельно от sequelize.authenticate()
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`)
// })


//более надежная версия — перенести app.listen() внутрь .then(), чтобы сервер не стартовал без БД.
sequelize.authenticate()
  .then(() => {
    console.log('DB connected')
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('DB error:', err)
  })
