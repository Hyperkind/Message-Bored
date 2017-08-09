const express = require('express');
const router = express.Router();

const db = require('../models');

const Users = db.Users;
const Topics = db.Topics;
const Messages = db.Messages;

// router.get('/:id', (req, res) => {
//   let targetId = req.params.id;
//   //this gets the message with id from the database

// });

router.get('/latest', (req, res) => {
  //posts most recent 10 messages with topic, date created, and name of author

});

router.get('/by-topic/:topic_id', (req, res) => {


});

router.post('/', (req, res) => {
  // create new message
  let {body, author_id, topic_id} = req.body;
  // let userId = req.user.id;

  return Messages.create({body, author_id, topic_id}).
  then(message => {
    res.json(message);
  })
});

module.exports = router;