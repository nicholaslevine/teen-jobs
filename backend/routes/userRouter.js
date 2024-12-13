const {Router} = require('express');
require('dotenv').config();
const userController = require('../controllers/userController');
const protect = require('../middleware/protectUsers');


const userRouter = Router();

userRouter.get('/', protect, userController.getJobOffers);
userRouter.get('/add/:jobId', protect, userController.addJob);
userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/info', protect, userController.info);

module.exports = userRouter;