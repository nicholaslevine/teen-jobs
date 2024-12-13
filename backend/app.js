const express = require('express');
const userRouter = require('./routes/userRouter');
const providerRouter = require('./routes/providerRouter');
const cookieParser = require('cookie-parser');
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/provider', providerRouter);

app.listen(3000, () => {
    console.log("App is running on port 3000");
})