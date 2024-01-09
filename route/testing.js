const express = require('express');
const router = express.Router();

const testingController = require('../controller/testingController');
const validate = require('../config/middleware/validation_input/validation_input');
const validedit = require('../config/middleware/validation_input/validation_input_update');
const validdell = require('../config/middleware/validation_input/validation_input_dell');
//const authvalidation = require('../config/middleware/utils/authVerify') authvalidation.verifyToken;

router.get('/', testingController.sayHello);
router.post('/doAddBio', validate, testingController.addBio);
router.get('/getAllBio', testingController.allGetData);
router.post('/getBy', validate, testingController.GetBy);
router.delete('/doDellBio', validdell, testingController.doDeleteBio);

module.exports = router;