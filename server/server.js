const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config('./.env')

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });

    console.log('mongoDB connected');
}

connectDB()

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))



const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`logged error:${err}`);
    server.close(() => process.exit(1))
})

