import * as express from "express";
import {
  userRoute,
  categoryRoute,
  productRoute,
  errorLogRoute,
  wishlistRoute,
  cartRoute,
  orderRoute,
} from "./routes/index";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as compression from "compression";
const app = express();

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/errorLog", errorLogRoute);
app.use("/wishlist", wishlistRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  next();
});

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});
