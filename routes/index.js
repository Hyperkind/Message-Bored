const express = require('express');
const userRouter = require('./users.js');
const topicRouter = require('./topics.js');
const messageRouter = require('./messages.js');

const router = express.Router();

router.use('/users', userRouter);
router.use('/topics', topicRouter);
router.use('/messages', messageRouter);

module.exports = router;