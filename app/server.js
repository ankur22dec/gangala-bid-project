const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const publicIp = require("public-ip");
var ip = require("ip");
var geoip = require("geoip-lite");
const cookieParser = require("cookie-parser");
const conversationManager = require("./manager/conversation");
const messageValidations = require("./validation/message");
const messageManager = require("./manager/message");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const { cloudinaryConfig } = require("./config/cloudinaryConfiguration");
require("dotenv").config();
const server = require("http").Server(app);
const io = require("socket.io")(server);
// const uploadContent = require("./routes/uploadContent");
// const root = require("path").join(__dirname, "client", "build");

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json()); // to parse json body
app.use(cookieParser());
app.use("*", cloudinaryConfig);
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mern.gangala.in",
  })
);
connectDB();
console.log(process.env.NODE_ENV);
app.use(express.json({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const getCountry = async () => {
  try {
    const country = await axios.get(
      "http://ipwhois.pro/json/?key=WgesGODgjdhblUP6"
    );
    console.log(country);
    console.log(`${process.env[`ODOO_${country.data.country_code}`]}`);
  } catch (e) {
    console.log(e);
  }
};
getCountry();
app.use("/api/product", require("./routes/Product"));
app.use("/api/country", require("./routes/Country"));
app.use("/api/user", require("./routes/User"));
app.use("/api/bot", require("./routes/Chatbot"));
app.use("/api/python", require("./routes/python"));
app.use("/api/acution", require("./routes/Auction"));
app.use("/api/wallet", require("./routes/Wallet"));
app.use("/api/wishlist", require("./routes/WishList"));
app.use("/api/payment", require("./routes/Payment"));
app.use("/api/address", require("./routes/Address"));

// app.get("*", (req, res) => {
//   res.sendFile("index.html", { root });
// });
const clients = [];
io.on("connection", client => {
  // console.log("connection: ", client.id);

  client.on("init", async userId => {
    // console.log("init: ", userId);
    client.userId = userId;
    if (clients[userId]) {
      clients[userId].push(client);
    } else {
      clients[userId] = [client];
    }
  });

  client.on("new-message", async data => {
    const error = messageValidations.create(data).error;
    if (!error) {
      await messageManager.create(data);
      const conversationMembers = await conversationManager.getMembersById(
        data.conversationId
      );
      conversationMembers.forEach(member => {
        member = member.toString();
        if (member !== data.authorId.toString()) {
          clients[member].forEach(cli => {
            cli.emit("message-received");
          });
        }
      });
    }
  });

  client.on("disconnect", () => {
    if (!client.userId || !clients[client.userId]) return;

    let targetClients = clients[client.userId];
    for (let i = 0; i < targetClients.length; ++i) {
      if (targetClients[i] == client) {
        targetClients.splice(i, 1);
      }
    }
    // console.log("disconnected!!! ", client.id);
  });
});

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Your Server is runing on ${PORT} port `);
});
