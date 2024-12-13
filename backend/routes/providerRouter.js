const {Router} = require('express');
const providerRouter = new Router();


providerRouter.post('/login', providerController.login);
providerRouter.post('/signup', providerController.signup);
providerRouter.post('/create', providerController.create);
providerRouter.get('/', providerController.getJobs);
providerRouter.post('/logout', providerController.logout);

module.exports = providerRouter;