const express = require('express');
const router = express.Router();

const db = require('../models');

const Users = db.Users;
const Topics = db.Topics;
const Messages = db.Messages;


router.get('/', (req, res) => {
  //this gets and lists all the messages from the database
  // no topics routes
  // but the nav menu needs to display these
  return Topics.findAll()
  .then(topics => {
    res.json(topics);
  })

});


router.get('/:id', (req, res) => {
  let targetId = req.params.id;
  //this gets the topics with id from the database
  //displays topic name , createdAt, createdBy, list of all the messages posted to it sorted by createdAt in ascending order, with author of message and createdAt of message
  let ourTopic = {};
  return Topics.findById(targetId, {include: [Users]})
  .then(topic => {
    ourTopic.topicId = topic.id;
    ourTopic.title = topic.name;
    ourTopic.postedDate = topic.createdAt;
    ourTopic.topicPostedBy = topic.User.username;

    return Messages.findAll({where: {topic_id: topic.id}, include: [Users], order: [['createdAt', 'ASC']]})
  })
  .then(messages => {
    ourTopic.messages = [];

    messages.forEach(message => {
      let msg = {
        msgId: message.id,
        body: message.body,
        postedDate: message.createdAt,
        msgPostedBy: message.User.username
      };
      return ourTopic.messages.push(msg);
    });

    return res.json(ourTopic);
  });

});



router.post('/', (req, res) => {
  // create new topic
  let {name, created_by} = req.body;

  return Topics.create({name, created_by})
  .then(topic => {
    res.json(topic);
  });
});

router.put('/:name', (req, res) => {
  //edit topic
});

module.exports = router;