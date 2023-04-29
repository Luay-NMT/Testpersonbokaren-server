const express = require('express');
const router = express.Router();
const db = require('../db');


router.get("/", (req, res) => {

  var connenction = db.dbConnect();
  connenction.connect((err) => {
    if (err) {
      console.log(err);
    }
});
    var queryGetAllUsers = "SELECT u.userId, u.shortName, u.fullName, g.`group`, g.groupName " +
    "FROM `users` u " +
    "LEFT JOIN `usergroups` ug ON u.userId = ug.userId " +
    "LEFT JOIN `groups` g ON ug.groupId = g.id";
      connenction.query(queryGetAllUsers, (err, result) => {
        connenction.destroy();
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });

    router.get("/:id", (req, res) => {
      const id = req.params.id;
      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });
        var queryGetUserBasedOnUserId = "SELECT u.userId, u.shortName, u.fullName, g.`group`, g.groupName " +
        "FROM `users` u " +
        "LEFT JOIN `usergroups` ug ON u.userId = ug.userId " +
        "LEFT JOIN `groups` g ON ug.groupId = g.id WHERE u.userId = ?"
          connenction.query(queryGetUserBasedOnUserId,[id], (err, result) => {
            connenction.destroy();
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
        });

    router.post("/", (req, res) => {
      const fullName = req.body.fullname;
      const shortName = req.body.shortName;
      const group = req.body.group;
      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });
        var queryAddToUsers = "INSERT INTO users (shortName, fullName) VALUES (?, ?)";
          connenction.query(queryAddToUsers, [shortName, fullName], (err, result) => {
            
            if (err) {
              console.log(err);
            }else {
            
              var queryAddToUserGroups = "INSERT INTO `usergroups` (userId, groupId) " +
                            "VALUES (?, (SELECT id FROM `groups` WHERE `group` = ?));";
              connenction.query(queryAddToUserGroups, [result.insertId, group], (err, result) => {
                if (err) {
                  console.log(err);
                }
                });
                res.send(result);
              }
              connenction.destroy();        

          });
        });




      router.put("/", (req, res) => {
      const fullName = req.body.fullname;
      const shortName = req.body.shortName;
      const groupId = req.body.groupId;
      const userId = req.body.userId;
          var connenction = db.dbConnect();
          connenction.connect((err) => {
            if (err) { console.log(err); }
        });

          var queryUpdateUser = "UPDATE users SET shortName = ?, fullName = ?, createdDate = NOW() WHERE userId = ?";
    
          
          
          connenction.query(queryUpdateUser, [shortName, fullName, userId], (err, result) => {
            if (err) { console.log(err); } else {
            var queryUpdateUserGroup = "UPDATE usergroups SET groupId = ? WHERE userId = ?";
            connenction.query(queryUpdateUserGroup, [groupId, userId], (err, result) => {
            connenction.destroy();
              if (err) { console.log(err); }
            });
            res.send(result);
          }

          });

        });

        router.delete('/delete/:id', (req, res) => {
          var connenction = db.dbConnect();
          const userId = req.params.id;

          connenction.connect((err) => {
            if (err) { console.log(err); }
        });
        var queryDeleteFromBookings= "DELETE FROM `bookings` WHERE userId = ?";
        connenction.query(queryDeleteFromBookings, userId, (err, result) => {

          if (err) { console.log(err); }else {
            
          
        var queryDeleteFromUserGroups = "DELETE FROM `usergroups` WHERE userId = ?";
          connenction.query(queryDeleteFromUserGroups, userId, (err, result) => {

            if (err) { console.log(err); }
            var queryDeleteFromUsers = "DELETE FROM `users` WHERE userId = ?";
            connenction.query(queryDeleteFromUsers, userId, (err, result) => {
              connenction.destroy();
              if (err) { console.log(err); }


          });
        
        });
        res.send(result);

      }
      });

      });



    module.exports = router;