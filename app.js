const express = require('express')
const Unblocker = require('unblocker');

const app = express();

const unblocker = new Unblocker({prefix: '/proxy/'});
app.use(unblocker);

app.listen(process.env.PORT || 8080).on('upgrade', unblocker.onUpgrade);
console.log("Node Unblocker Server Running On Port:", process.env.PORT || 8080)
