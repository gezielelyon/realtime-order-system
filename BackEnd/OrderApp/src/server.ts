import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

import Routes from './routes';

mongoose.connect('mongodb://localhost:27017/ordersapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use((request: Request, response: Response, next: NextFunction) => {
    request.io = io;
    return next();
});
app.use(cors());
app.use(express.json());
app.use(Routes);

server.listen(3333, () => {
    console.log('🚀 Server started on port 3333!');
});
