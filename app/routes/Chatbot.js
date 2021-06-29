var express = require("express");
const router = express.Router();
const axios = require("axios").default;

router.post("/", (req, res, next) => {
  console.log("req.body: ", req.body);

  if (!req.body.message) {
    console.log("please send message in json body");
    res.status(403).send(`please send message in json body, i.e:
            {
                message: String, //"hey chatbot tell me weather updates",
                from: String //"John@email.com"
            }
        `);
    return;
  }
  let obj = {};
  if (req.body.from == "") {
    obj = { message: req.body.message };
  } else {
    obj = {
      message: req.body.message,
      sender: req.body.from
    };
  }

  axios({
    method: "post",
    url: process.env.CHATBOT_URL,
    data: obj,
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
    .then(resInner => {
      // console.log("data: ", data.data);
      console.log("THIS", resInner);
      let respData = resInner.data.map(eachItem => {
        if (eachItem.buttons) {
          return {
            buttons: eachItem.buttons,
            from: "chatbot",
            message: eachItem.text,
          };
        } else {
          return {
            from: "chatbot",
            message: eachItem.text,
          };
        }
      });
      res.status(200).send(respData);
    })
    .catch(error => {
      console.log("ERROR HERE", error);
      res.send([
        {
          from: "chatbot",
          message: "something went wrong: " + JSON.stringify(error),
        },
      ]);
    });
});

module.exports = router;
