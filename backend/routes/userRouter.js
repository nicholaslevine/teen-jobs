const {Router} = require('express');
require('dotenv').config();
const userRouter = Router();

userRouter.get('/', userController.getJobOffers);
userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/info', userController.info);

module.exports = userRouter;