const axios = require('axios');
const TELEGRAM_BOT_TOKEN = 'YOUR-BOT-TOKEN';
const TELEGRAM_CHAT_ID = '@p2pp2p_p2p';

function notifySupport(msg) {
  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text: msg
  });
}
module.exports = { notifySupport };
