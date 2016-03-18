var express = require('express');
var app = express();
var router = express.Router(); 
var bodyParser = require('body-parser');
var cors = require('cors')

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
      var room = rooms[roomId];
      var userNames = new Set()
      room.messages.forEach(function(msg) { 
        userNames.add(msg.name);
      });

      res.send({
        id: room.id,
        name: room.name,
        users: Array.from(userNames),
      })
    }

    res.send('Room not found', 404);
  })

router.route(ROOMS_LIST)
  .get(function (req, res) {
    var resp = rooms.map(function(room) { 
      return {
        id: room.id,
        name: room.name,
      };
    });
    res.send(resp);
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


app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);


app.listen(app.get('port'), function () {
  console.log('Chat app listening on port!' + app.get('port'));
});
