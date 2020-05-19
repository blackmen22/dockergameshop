import * as express from "express";
import { userRoute } from "./routes/userRoutes";
import * as bodyParser from "body-parser";
const app = express();

app.use("/user", userRoute);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  next();
});


app.listen(3000, () => console.log("server start"));