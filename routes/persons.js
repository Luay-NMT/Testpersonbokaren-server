const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', function(req, res) {
  var connenction = db.dbConnect();
  connenction.connect((err) => {
  if (err) {
    console.log(err);
  }
    });
                
    var queryGetAllTestpersons = `SELECT t.testpersonId,
    IF(t.testpersonId = b.testpersonId, 'Ja', 'Nej') as isBooked,
    b.userId as bookingUserId,
    (SELECT u.fullName FROM users u WHERE u.userId = b.userId) as bookingUserFullName
    FROM testpersons t
    LEFT JOIN bookings b ON t.testpersonId = b.testpersonId
    ORDER BY t.testpersonId ASC`;
    connenction.query(queryGetAllTestpersons, (err, result) => {
      connenction.end();
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });

  router.post("/", (req, res) => {
    var connenction = db.dbConnect();
    connenction.connect((err) => {
      if (err) {
        console.log(err);
      }
  });
    const testpersons = req.body.testpersons;
    const userId = req.body.userId;
    const logRef = req.body.logRef;
    var queryAddToBookings = "INSERT INTO bookings (userId, testpersonId, bookingLogRef) VALUES ?";

    var values = [];
      testpersons.forEach((testperson) => {
        values.push([userId, testperson, logRef])
      });

        connenction.query(queryAddToBookings, [values], (err, result) => {
      if (err) {

        console.log(err);
      } else {
        res.send(result);
      }
      connenction.end();

    });
  });

    module.exports = router;
