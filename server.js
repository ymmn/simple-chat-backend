var express = require('express');
var app = express();
var router = express.Router(); 
var bodyParser = require('body-parser');

// routes
var ROOMS_DETAIL = '/rooms/:room_id';
var ROOMS_LIST = '/rooms';
var MESSAGES_LIST = '/rooms/:room_id/messages';


// all the data
var rooms = [
  {
    id: 0,
    name: 'The Cool Chats',
    messages: [
      {
        name: "Abdul",
        message: "ayyyy",
      }
    ],
  },
];


router.route(ROOMS_DETAIL)
  .get(function (req, res) {
    var roomId = req.params.room_id;
    if (rooms[roomId]) {
      res.send(rooms[roomId])
    }

    res.send('Room not found', 404);
  })

router.route(ROOMS_LIST)
  .get(function (req, res) {
    res.send(rooms);
  });

router.route(MESSAGES_LIST)
  .get(function (req, res) {
    var roomId = req.params.room_id;

    if (rooms[roomId]) {
      res.send(rooms[roomId].messages);
    }

    res.send('Room not found', 404);
  })
  .post(function (req, res) {
    var data = req.body;
    var roomId = req.params.room_id;

    if (rooms[roomId]) {
      rooms[roomId].messages.push({
        name: data.name, 
        message: data.message, 
      });

      res.send('OK', 201);
    }

    res.send('Room not found', 404);
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);


app.listen(8080, function () {
  console.log('Chat app listening on port 8080!');
});
