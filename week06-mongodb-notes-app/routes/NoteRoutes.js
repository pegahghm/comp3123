const express = require('express');
const noteModel = require('../models/NotesModel');
const router = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note title, description, and priority are required."
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
    });

    note.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => {
            res.send(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', (req, res) => {
    const id = req.params.noteId;

    noteModel.findById(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + id
                });
            }
            res.send(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving note with id " + id
            });
        });
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', (req, res) => {
    const id = req.params.noteId;

    // Validate request
    if (!req.body.noteTitle && !req.body.noteDescription && !req.body.priority) {
        return res.status(400).send({
            message: "At least one field (title, description, or priority) must be provided."
        });
    }

    noteModel.findByIdAndUpdate(id, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()  
    }, { new: true })
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });
        }
        res.send(note);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error updating note with id " + id
        });
    });
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', (req, res) => {
    const id = req.params.noteId;

    noteModel.findByIdAndDelete(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete note with id " + id
            });
        });
});

module.exports = router;