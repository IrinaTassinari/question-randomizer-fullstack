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
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : null;

app.use(express.json())

//origin в cors должен указывать адрес фронтенда, который отправляет запросы, а не адрес самого backend

app.use(
  cors(
    allowedOrigins
      ? {
          origin(origin, callback) {
            // Allow non-browser tools and same-origin requests without Origin header.
            if (!origin || allowedOrigins.includes(origin)) {
              return callback(null, true);
            }

            return callback(new Error("CORS origin not allowed"));
          },
        }
      : undefined
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
