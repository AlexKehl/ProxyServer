const express = require("express");
const Unblocker = require("unblocker");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.PORT) {
  console.error("Please create a .env file with the PORT variable");
  process.exit(1);
}

if (!process.env.SECRET) {
  console.error("Please create a .env file with the PORT variable");
  process.exit(1);
}

const app = express();

const unblocker = new Unblocker({
  prefix: "/proxy/",
  requestMiddleware: [
    (req) => {
      if (req?.headers?.secret !== process.env.SECRET) {
        throw new Error();
      }
    },
  ],
});
app.use(unblocker);

app.listen(process.env.PORT || 8080).on("upgrade", unblocker.onUpgrade);
console.log("Node Unblocker Server Running On Port:", process.env.PORT || 8080);
