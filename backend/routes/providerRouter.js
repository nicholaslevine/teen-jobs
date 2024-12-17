const {Router} = require('express');
const providerRouter = new Router();
const providerController = require('../controllers/providerController');
const protect = require('../middleware/protectProviders');


providerRouter.post('/login', providerController.login);
providerRouter.post('/signup', providerController.signup);
providerRouter.post('/create', protect, providerController.create);
providerRouter.get('/', protect, providerController.getJobs);
providerRouter.post('/logout', providerController.logout);
providerRouter.get('/info', protect, providerController.info);

module.exports = providerRouter;