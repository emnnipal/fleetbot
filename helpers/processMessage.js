const API_AI_TOKEN = 'dc6df31f889b4b6ba1ee2e6128d656fb';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAACNzCJO9DkBAPtS7GQQkZBlZCDZC3K53GNVHwjvLjfNVWMaVKrH8J5lU1BqAOyFGKKK2FKtNF314h22xZAQ9QSgZArmPkxsTzmPkBPUDUI8j5ip4dlf7ahNz19YeeCHIl8Ynp0Hpdi5nTtXkWIHkCrZByPRZAnMst8Y5jul4jIO8cuZCMKZBOYfXDTI3jzJD2FQZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text },
    }
  });
};
module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'crowdbotics_bot' });
  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};