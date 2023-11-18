const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const connectDB = require('./config/connectdb');

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//CROSS ORIGIN RESOURCE SHARING
const cors = require('cors');
app.use(cors({credentials: true , origin: 'http://localhost:3000'}));


app.use(express.static(path.join(__dirname, 'public')));


const userRouter = require('./routes/userRoute');
app.use('/user',userRouter);


const adminRouter = require('./routes/adminRoute');
app.use('/admin',adminRouter);

const trainerRouter = require('./routes/trainerRoute');
app.use('/trainer',trainerRouter);

const chatRouter = require('./routes/chatRoute');
app.use('/chat',chatRouter);

const messageRouter = require('./routes/messageRoute');
app.use('/message',messageRouter);

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
})
.catch((error)=> {
    console.log('Cannot connect to the Server',error);
})

