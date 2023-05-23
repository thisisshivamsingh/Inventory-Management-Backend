const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const itemRouter = require("./routes/itemRoutes");
const orderRouter = require("./routes/orderRoutes");
const requestRouter = require("./routes/requestRoutes");
const storeRouter = require("./routes/storeRoutes");
const userRouter = require("./routes/userRoutes");
const departmentRouter = require("./routes/departmentRoutes");

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(cors({ origin: "*" }));
app.use(express.json());

// 3) ROUTES\
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/departments", departmentRouter);

module.exports = app;
