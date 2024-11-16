import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import connectDB from "./db/index.js"
import session from "express-session"
import { isAuthenticated } from "./middlewares/auth.middleware.js"

const app = express()

app.use(express.json())

app.use(session({
    secret: "jbviuwe8fh2iqhiofhwioe", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

connectDB() // Connect to MongoDB
    .then(() => {
        app.listen(8001, () => {
            console.log("Server running on port 8000");
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    });

app.use(cookieParser())

app.listen(8000, () => {
    console.log(`Server is running at port 8000`)
})

app.use('/api/v1/users', userRouter)
app.use('/dashboard', isAuthenticated, (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }
})