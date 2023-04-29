const express = require('express');
const router = express.Router();
const db = require('../db');



router.get("/:id", (req, res) => {
  var connenction = db.dbConnect();
  connenction.connect((err) => {
    if (err) {
      console.log(err);
    }
});
    const personnummer = String(req.params.id);
    const id = personnummer.concat("%");
    let queryFindTestpersonsByTestpersonId = `SELECT t.testpersonId,
    IF(t.testpersonId = b.testpersonId, 'Ja', 'Nej') as isBooked,
    b.userId as bookingUserId,
    (SELECT u.fullName FROM users u WHERE u.userId = b.userId) as bookingUserFullName
    FROM testpersons t
    LEFT JOIN bookings b ON t.testpersonId = b.testpersonId
    WHERE t.testpersonId LIKE ? `
    ;
      connenction.query(queryFindTestpersonsByTestpersonId,[id], (err, result) => {
        connenction.destroy();
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    router.get("/bookings/:id", (req, res) => {
      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });
        const personnummer = String(req.params.id);
        const id = personnummer.concat("%");
        let queryFindBookingsByTestpersonId  = `SELECT b.bookingId,b.userId,u.fullName as 'bookingUserFullName',
        b.testpersonId,b.bookingTime FROM bookings b LEFT JOIN users u ON b.userId = u.userId
        WHERE b.testpersonId LIKE ? `
        ;
          connenction.query(queryFindBookingsByTestpersonId,[id], (err, result) => {
            connenction.destroy();
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
        });

    
      router.get("/basedOnGroup/:id", (req, res) => {
        var connenction = db.dbConnect();
        connenction.connect((err) => {
          if (err) {
            console.log(err);
          }
      });
        const user = String(req.params.id);
        let queryFindBookingsByGroup = "SELECT b.bookingId, b.userId, u.shortName, u.fullName as 'bookingUserFullName', b.testpersonId,  CONCAT(g.groupName, ' (', g.`group`, ')') as 'group' " +
        "FROM bookings b " +
        "LEFT JOIN users u ON u.userId = b.userId " +
        "LEFT JOIN usergroups ug ON u.userId = ug.userId " +
        "LEFT JOIN `groups` g ON ug.groupId = g.id " +
        "WHERE g.`id` = ?";
          connenction.query(queryFindBookingsByGroup,[user], (err, result) => {
            connenction.destroy();
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
        });


router.get("/ageSpan/:min/:max", (req, res) => {
  const minAge = req.params.min;
  const maxAge = req.params.max;

  let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

let year = date_ob.getFullYear();
let minYear = year - minAge;
let maxYear = year - maxAge -1;
let maxPersonnumber = minYear.toString().concat(month).concat(date).concat("9999");
let minPersonnumber = maxYear.toString().concat(month).concat(++date).concat("0000");

var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });


let queryFindTestpersonsBetweenTwoAges = `SELECT t.testpersonId,
IF(t.testpersonId = b.testpersonId, 'Ja', 'Nej') as isBooked,
b.userId as bookingUserId,
(SELECT u.fullName FROM users u WHERE u.userId = b.userId) as bookingUserFullName
FROM testpersons t
LEFT JOIN bookings b ON t.testpersonId = b.testpersonId
WHERE t.testpersonId BETWEEN ? AND ? `
;
  connenction.query(queryFindTestpersonsBetweenTwoAges,[minPersonnumber, maxPersonnumber], (err, result) => {
    connenction.destroy();
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
router.get("/birthYear/:min/:max", (req, res) => {
  const minAge = req.params.min;
  const maxAge = req.params.max;

let minPersonnumber = minAge.toString().concat("01010000");
let maxPersonnumber = maxAge.toString().concat("12319999");

var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });


var queryFindTestpersonsBetweenTwoBirthYears = `SELECT t.testpersonId,
IF(t.testpersonId = b.testpersonId, 'Ja', 'Nej') as isBooked,
b.userId as bookingUserId,
(SELECT u.fullName FROM users u WHERE u.userId = b.userId) as bookingUserFullName
FROM testpersons t
LEFT JOIN bookings b ON t.testpersonId = b.testpersonId
WHERE t.testpersonId BETWEEN ? AND ? `
;
  connenction.query(queryFindTestpersonsBetweenTwoBirthYears,[minPersonnumber, maxPersonnumber], (err, result) => {
    connenction.destroy();
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



    module.exports = router;