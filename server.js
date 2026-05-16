"use strict";

// Server setup med användning av express och cors
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models/db");
const menuRoutes = require("./routes/menuRoute");
const openingHoursRoute = require("./routes/openingHoursRoute");
const bookingRoute = require("./routes/bookingRoute");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/menu", menuRoutes);
app.use("/opening-hours", openingHoursRoute);
app.use("/bookings", bookingRoute);

// Bestämmer vilken router som ska användas för olika endpoints
app.listen(port, () => {
    console.log('Server körs på port ' + port);
});

module.exports = app;