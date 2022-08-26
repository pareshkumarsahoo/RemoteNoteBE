const express = require("express");
const Note = require("../Schema/Note");
const router = express.Router();

//GET ALL API
router.get("/",async (req,res)=>{
    const notes = await Note.find().sort("-updatedAt");
    res.status(200).send(notes)
})


//POST API for NOTE
router.post('/', async(req,res)=>{
    let note = await new Note({
        title:req.body.title,
        description:req.body.description
    });
    try{
        note = await note.save();
        res.status(201).send({
            status:true,
            data:note
        })
    }catch{
        console.log(e);
        res.status(400).send({
            status:false,
            err:err
        })

    }
})


//DELETE API FOR NOTE
router.delete("/:id", (req, res) => {
    Note.deleteOne({ _id: req.params.id })
      .then((note) => {
        if (!note || note.deletedCount == 0) {
          return res.status(404).send({
            status: false,
            message: "No record found !",
          });
        } else {
          return res.status(200).send({
            message: "Note Deleted Succesfully!",
            status: true,
          });
        }
      })
      .catch((err) => {
        return res.status(403).send(err);
      });
  });

  //update for note api
  
router.put("/:id", async (req, res) => {
    const options = { returnDocument: "after" };
    try {
      let note = await Note.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        options
      );
      if (note == null) {
        return res.status(404).send({
          status: false,
          message: "No record found !",
        });
      } else {
        res.status(201).send({
          status: true,
          message: "Note Updated!",
          data: note,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({
        status: false,
        message: "Saving Failed",
        err: err,
      });
    }
  });
  


module.exports = router;