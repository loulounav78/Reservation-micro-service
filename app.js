const express = require("express");
const mongoose = require("mongoose");
const reservationsRouter = require("./routes/reservations");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/reservations";

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reservations API",
      version: "1.0.0",
      description: "API for managing hotel reservations",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use reservations routes
app.use("/reservations", reservationsRouter);

app.listen(4000, () => console.log("Reservation service running on port 4000"));
