const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", (req, res) => {
  var connenction = db.dbConnect();
  connenction.connect((err) => {
    if (err) { console.log(err); }
});
    var queryGetAllBookings = `SELECT b.bookingId,b.userId,b.bookingLogRef,u.fullName as 'ownerName',b.testpersonId,b.bookingTime FROM bookings b LEFT JOIN users u ON b.userId = u.userId`;
    connenction.query(queryGetAllBookings, (err, result) => {
      connenction.end();

        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });


    router.put("/", (req, res) => {
      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) { console.log(err); }
    });
      const testpersonId = req.body.testpersonId;
      const userId = req.body.userId;
      const logRef = req.body.logRef;
      var queryUpdateBooking = "UPDATE bookings " + "SET userId = ?, bookingLogRef = ? " + "WHERE testpersonId = ?";

      connenction.query(queryUpdateBooking, [userId, logRef, testpersonId], (err, result) => {
        connenction.end();
        if (err) { console.log(err); } else { res.send(result); }
      });
    });

    router.delete('/:id', (req, res) => {
      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) { console.log(err); }
    });
      const id = req.params.id;
      var queryDeleteBookingBasedOnTestpersonId = "DELETE FROM bookings WHERE testpersonId = ?";
      connenction.query(queryDeleteBookingBasedOnTestpersonId, [id], (err, result) => {
        connenction.end();
        if (err) { console.log(err); } else { res.send(result); }
      });
    });
    module.exports = router;
