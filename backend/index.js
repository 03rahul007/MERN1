require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const allUserRoute = require("./routes/allUserRoute")
const userRoute = require("./routes/userRoute")
const path = require("path")
// Enable CORS for all origins (or restrict to specific origins)
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",userRoute)
app.use("/",allUserRoute)


// app.get('/')
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
