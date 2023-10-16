const axios = require("axios");

function harperSaveMessage(message, username, room) {
  const dbUrl = process.env.HARPER_URL;
  const dbPw = process.env.HERPER_PW;
  if (!dbUrl || !dbPw) return null;

  const data = JSON.stringify({
    operation: "insert",
    schema: "realtime_chat_app",
    table: "messages",
    records: [
      {
        message,
        username,
        room,
      },
    ],
  });

  const config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: dbPw,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

module.exports = harperSaveMessage;
