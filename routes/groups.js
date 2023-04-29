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
    var queryGetAllGroups = "SELECT id, `group`, groupName FROM `groups` ORDER BY `id` COLLATE utf8_swedish_ci ASC;";
    
      connenction.query(queryGetAllGroups, (err, result) => {
        connenction.destroy();
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });

    router.get("/:id", (req, res) => {
      const group = req.params.id;

      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });
        var queryGetGroupBasedOnGroupId = "SELECT id, `group`, groupName FROM `groups` WHERE `group` = ? ORDER BY `id` COLLATE utf8_swedish_ci ASC;";
          connenction.query(queryGetGroupBasedOnGroupId,[group], (err, result) => {
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
      var connenction = db.dbConnect();
      connenction.connect((err) => {
        if (err) {
          console.log(err);
        }
    });
        var queryAddToGroups = "INSERT INTO `groups`(`group`,`groupName`) VALUES(?,?);";
          connenction.query(queryAddToGroups, [shortName, fullName], (err, result) => {
            
            if (err) {
              console.log(err);
            }
              else {
                res.send(result);
              }
              connenction.destroy();        

        });
      });

      router.put("/", (req, res) => {
        const fullName = req.body.fullname;
        const shortName = req.body.shortName;
        const groupId = req.body.groupId;
            var connenction = db.dbConnect();
            connenction.connect((err) => {
              if (err) { console.log(err); }
          });
  
            var queryUpdateGroups = "UPDATE `groups` SET `group` = ?, `groupName` = ? WHERE `id` = ?";
            connenction.query(queryUpdateGroups, [shortName, fullName, groupId], (err, result) => {

              if (err) { console.log(err); } else {
                res.send(result);
              }
              
              connenction.destroy();
  
            });
          });


          router.delete('/delete/:id', (req, res) => {
            var connenction = db.dbConnect();
            const groupId = req.params.id;
            connenction.connect((err) => {
              if (err) { console.log(err); }
          });
          var queryGetUserIdFromUserGroups = "SELECT userId FROM `usergroups` WHERE `groupId` = ?";
          connenction.query(queryGetUserIdFromUserGroups, groupId, (err, result) => {
            if (err) { console.log(err); }else {

            
           let values = JSON.parse(JSON.stringify(result));
           var queryDelteFromBookings= "DELETE FROM `bookings` WHERE userId = ?";
           values.forEach((v) =>connenction.query(queryDelteFromBookings, v.userId, (err, result) => {if (err) { console.log(err); }
           
          }) );

                    
          
          var queryDeleteFromUserGroups = "DELETE FROM `usergroups` WHERE userId = ?";

          values.forEach((v) =>connenction.query(queryDeleteFromUserGroups, v.userId, (err, result) => {if (err) { console.log(err); }
           
        }) );
           
              var queryDeleteFromUsers = "DELETE FROM `users` WHERE userId = ?";
              values.forEach((v) =>connenction.query(queryDeleteFromUsers, v.userId, (err, result) => {if (err) { console.log(err); }
           
            }) );
                var queryDeleteFromGroups = "DELETE FROM `groups` WHERE id = ?";
                connenction.query(queryDeleteFromGroups, groupId, (err, result) => {
                  connenction.destroy();
                  if (err) { console.log(err); }
            });
          
          
            res.send(result);
          }
          });
        
        });

        
  
  
    module.exports = router;