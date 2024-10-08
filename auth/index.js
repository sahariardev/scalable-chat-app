import express from 'express'
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import connectToMongoDB from "./db/connection.mongodb.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use('/auth', authRouter);
app.use('/users', userRouter);


app.listen(port, async () => {
    await connectToMongoDB()
    console.log(`Auth started at ${port}`);
});