const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");


router.get("/users/:id", async (req, res, next) => {
  const data = await User.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "userId",
        as: "employeeInfo",
      },
    },
    { $unwind: "$employeeInfo" },

    {$match : {
      _id :  new mongoose.Types.ObjectId(req.params.id)
    }},

    {
      $graphLookup: {
        from: "employees",
        startWith: "$_id",
        connectFromField: "userId",
        connectToField: "managerId",
        as: "employees",
        maxDepth:4
      },
    },
    {
      $project: {
        _id: 0,
        userId: "$employeeInfo.userId",
        name: "$employeeInfo.firstName",
        role: "$employeeInfo.role",
        employees: {
          $map: {
            input: "$employees",
            as: "employee",
            in: {
              userId: "$$employee.userId",
              name: "$$employee.firstName",
              role: "$$employee.role"
            },
          },
        },
      },
    },
  ]).exec();

  res.send(data);
});


module.exports = router;

// {
//   $lookup: {
//     from: "employees",
//     localField: "_id",
//     foreignField: "userId",
//     as: "employeeInfo",
//   },
// },
// { $unwind: "$employeeInfo" },
// {
//   $lookup: {
//     from: "employees",
//     localField: "employeeInfo.managerId",
//     foreignField: "userId",
//     as: "managerInfo",
//   },
// },
// { $unwind: "$managerInfo" },
// {
//   $project: {
//     userId: "$employeeInfo.userId",
//     name: "$employeeInfo.firstName",
//     _id: 0,
//     role: "$employeeInfo.role",
//     managerName: "$managerInfo.firstName",
//     managerRole: "$managerInfo.role",
//     managerId: {
//       $cond: {
//         if: { $eq: ["$employeeInfo.managerId", null] },
//         then: null,
//         else: "$employeeInfo.managerId",
//       },
//     },
//   },
// },
// {
//   $group: {
//     _id: {
//       $cond: {
//         if: { $eq: ["$managerId", null] },
//         then: null,
//         else: "$managerId",
//       },
//     },
//     name: { $first: "$managerName" },
//     role: { $first: "$managerRole" },
//     employees: {
//       $push: {
//         userId: "$userId",
//         name: "$name",
//         role: "$role",
//       },
//     },
//   },
// },
// {
//   $match : {
//     _id : new mongoose.Types.ObjectId(req.params.id)
//   }
// }
