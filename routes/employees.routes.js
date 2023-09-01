const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user.model");
const Employee = require("../models/employees.model");

router.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, password, role, managerId } = req.body;

  const user = new User({ email, password });
  const { _id } = await user.save();

  const employee = new Employee({
    firstName,
    lastName,
    role,
    userId: _id,
    managerId,
  });
  const result = await employee.save();
  res.send(result);
});

module.exports = router;

// router.post("/register", async (req, res, next) => {

//   const doesExists = await Employee.find({email : req.body.email})
//   if(doesExists)
//   {
//     console.log(doesExists)
//     const found = doesExists.find((item) =>{
//       if(item.email === req.body.email)
//       {
//         if(item.phone.length === req.body.phone.length)
//         {

//         }
//       }
//     })

//     if(found) next(createError.BadRequest())
//   }
//   const employee = new Employee(req.body);
//   const data = await employee.save();
//   res.send(data);
// });
