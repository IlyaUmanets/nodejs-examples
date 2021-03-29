var express = require('express');
var router = express.Router();

const VoiceResponse = require('twilio').twiml.VoiceResponse;

router.get('/', (req, res) => {
  res.send('twilio is here')
})

router.post('/voice_simple', (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say({ voice: 'alice' }, 'hello world!');

  res.type('text/xml')
  res.send(twiml.toString());
});

router.post('/voice_gather_input', (req, res) => {
  const twiml = new VoiceResponse();

  function gather() {
    const gatherNode = twiml.gather({ numDigits: 1 });

    gatherNode.say('For sales, press 1. For support, press 2.');

    twiml.redirect('/twilio/voice_gather_input');
  }

  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1':
        twiml.say('You selected sales. Good for you!');
        break;
      case '2':
        twiml.say('You need support. We will help');
        break;
      default:
        twiml.say("Sorry, I don't understand the choice").pause();
        gather();
        break;
    }
  } else {
    gather();
  }


  res.type('text/xml');
  res.send(twiml.toString());
})

module.exports = router;
