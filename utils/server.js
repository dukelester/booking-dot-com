import express from "express";
import authRoute from '../routes/auth.js';
import hotelsRoute from '../routes/hotels.js';
import roomsRoute from '../routes/rooms.js';
import usersRoute from '../routes/users.js';

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/hotels', hotelsRoute);
    app.use('/api/rooms', roomsRoute);

    return app;
};

export default createServer;