const express = require("express");
const app = express();
const dropDownRouter = require("./routes/dropDownRoutes");
const orderRouter = require("./routes/orderRoutes");
const requestRouter = require("./routes/requestRoutes");
const storeRouter = require("./routes/storeRoutes");

// Body parser, reading data from body into req.body
app.use(cors({ origin: "*" }));
app.use(express.json());

// 3) ROUTES\
app.use("/api/v1/dropdowns", dropDownRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/stores", storeRouter);

module.exports = app;
