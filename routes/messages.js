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

router.get('/', (req, res) => {
  //posts most recent 10 messages with topic, date created, and name of author
  return Messages.findAll({include: [Users, Topics], order: [['createdAt', 'DESC']]})
  .then(messages => {
    let formattedMsgs =[];
    messages.forEach(message => {
      let msg = {
        msgId: message.id,
        title: message.Topic.name,
        body: message.body,
        postedDate: message.createdAt,
        msgPostedBy: message.User.username
      };
      return formattedMsgs.push(msg);
    });

    return res.json(formattedMsgs);
  })

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

router.put('/:id', (req, res) => {
  console.log('put on messages is being hit');
  let targetId = req.params.id;
  return Messages.findById(targetId)
  .then(message => {
    return message.update({body: req.body.body});
  })
  .then(updatedMessage => {
    console.log('this is what the update method returns in sequelize', updatedMessage);
    return res.json(updatedMessage);
  })
});

router.delete('/:id', (req, res) => {
  console.log('delete route is firing!');
  let targetId = req.params.id;

  return Messages.destroy({where: {id: targetId}})
  .then(ripMessage => {
    console.log('this is what we get back from delete sequelize', ripMessage);
    return res.json(ripMessage);
  })
})

module.exports = router;