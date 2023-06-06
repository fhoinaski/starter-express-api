const {Router}  = require('express');
const usersRoutsV1 =  Router();
const usersV1 = require('./v1Users/usersRoutes');
const newIdsV1 = require('./v1NewsIds/newsIdsRouts');

usersRoutsV1.use(usersV1,newIdsV1);

module.exports = usersRoutsV1;