var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Socket.IO聊天室' });
});

router.get('/ws', function (req, res, next) {
  res.render('ws', { title: 'WS聊天室' });
});

module.exports = router;