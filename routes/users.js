const express = require('express');
const router = express.Router();

const db = require('../models');

const Users = db.Users;
const Topics = db.Topics;
const Messages = db.Messages;

router.get('/', (req, res) => {
  //this gets and lists all the users from the database
  //with links to their get:/id

  // res.send('haaaloooo');

  Users.findAll()
  .then((users) => {
    return res.json(users);
  });


});


router.get('/login/:username', (req, res) => {
  console.log('get to login/:username running');
  let targetUsername = req.params.username;
  let ourUser = {};
  //this gets the user with id from the database
  //displays the user's name, when they joined (created_at), a list of all their messages sorted by createdAt - each message shows which topic it was posted on and created date of message

  //find user by Id, get name, created_at
  //find messages by user Id (author_id), include topic.name, - post body and created_at

  return Users.findOne({where: {username: targetUsername}})
  .then(user => {
    if (!user) {res.send ('Not a valid user.'); }
    // res.json(user);
    ourUser.username = user.username;
    ourUser.id = user.id;
    ourUser.joined = user.createdAt;
    return res.json(ourUser);
  });

});


router.get('/:id', (req, res) => {
  let targetId = req.params.id;
  let ourUser = {};
  //this gets the user with id from the database
  //displays the user's name, when they joined (created_at), a list of all their messages sorted by createdAt - each message shows which topic it was posted on and created date of message

  //find user by Id, get name, created_at
  //find messages by user Id (author_id), include topic.name, - post body and created_at

  return Users.findById(targetId)
  .then(user => {
    // res.json(user);
    ourUser.username = user.username;
    ourUser.id = user.id;
    ourUser.joined = user.createdAt;
    if (!user) {res.send ('Not a valid user.'); }
    return Messages.findAll({where: {author_id: targetId}, include: [Topics], order: [['createdAt', 'DESC']]})
  })
  .then(messages => {
    console.log(messages);
    ourUser.messages = [];
    messages.forEach(message => {
      let msg = {
        body: message.body,
        createdAt: message.createdAt,
        topicName: message.Topic.name,
        topicId: message.Topic.id
      };
      return ourUser.messages.push(msg);
    });

    console.log('THE USER OBJECT WE ARE SENDING BACK', ourUser);
    return res.json(ourUser);
  })

});


// router.post('/', (req, res) => {
//   console.log('this is what we are receiving on POST', req);
//   let {username} = req.body;

//   return Users.create({username})
//   .then(createdUser => {
//     res.send(createdUser);
//   });

// });

module.exports = router;