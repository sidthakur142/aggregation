const express = require("express");
const app = express();
const port = process.argv[2] || 3000;
const createError = require("http-errors");
const errorHandler = require('./middlewares/errorHandler')
const employeesRoute = require('./routes/employees.routes')
const usersRoute = require('./routes/users.routes')

require('dotenv').config()
require('./db/mongoose')

app.use(express.json())

app.get("/", (req, res) => {
  res.send("working...");
});

app.use('/api/',employeesRoute)
app.use('/api/',usersRoute)

app.use((req, res, next) => {
  next(createError.NotFound("Please enter a valid URL!"));
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
