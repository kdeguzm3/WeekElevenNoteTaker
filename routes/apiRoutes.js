const fs = require('fs');
const router = require("express").Router();
const store = require("../js/store");
const path = require('path');
let db = require("../db/db.json");

router.get("/notes", function(request, response) {
  // get a note
  // see 15-HotRestaurant/Solved for more info
  response.send(db);
});

// other apis here
router.post("/notes", function(req, res) {
  db.push(store(req.body));
  res.json(true);
  const data = JSON.stringify(db);
  writeDb();
})
// /api/notes/:id

router.delete("/notes/:id", function(req, res) {
db = db.filter(elem => elem.id != req.params.id);
res.json(true);
writeDb();
})

function writeDb() {
const data = JSON.stringify(db,null,"\t")
fs.writeFile(path.join(__dirname, "../db/db.json"), data, err => {if (err) throw err});
}
module.exports = router;