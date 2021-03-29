var express = require('express');
var router = express.Router();

const VoiceResponse = require('twilio').twiml.VoiceResponse;

router.get('/', (req, res) => {
  res.send('twilio is here')
})

router.post('/voice', (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say({ voice: 'alice' }, 'hello world!');

  res.send(twiml.toString());
});

module.exports = router;
