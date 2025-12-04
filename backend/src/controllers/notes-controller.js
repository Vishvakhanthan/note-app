import Note from "../models/Note.js";

export default class NotesController {
  static async getAllNotes(_, res) {
    try {
      const notes = await Note.find().sort({ createdAt: -1 }); // newest-first
      res.status(200).json(notes);
    } catch (error) {
      logError(error, "Error on fetch!");
    }
  }

  static async getNoteById(req, res) {
    try {
      const note = await Note.findById(req.params.id);
      res.status(200).json(note);
    } catch (error) {
      logError(error, "Error on fetching by ID!");
    }
  }

  static async addNewNote(req, res) {
    try {
      const { title, content } = req.body;
      const note = new Note({ title: title, content: content });
      const savedNote = await note.save();

      res.status(201).json(savedNote);
    } catch (error) {
      logError(error, "Error on adding new note!");
    }
  }

  static async updateExistingNote(req, res) {
    try {
      const id = req.params.id;
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
      if (!updatedNote)
        return res.status(404).json({ message: "Note not found!" });
      res.status(200).json(updatedNote);
    } catch (error) {
      logError(error, "Error on updating existing note!");
    }
  }

  static async deleteNote(req, res) {
    try {
      const id = req.params.id;
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote)
        return res.status(404).json({ message: "Note not found!" });
      res.status(200).json(deletedNote);
    } catch (error) {
      logError(error, "Error on deleting note!");
    }
  }
}

function logError(error, message) {
  console.error(error);
  res.status(500).json({ message: message });
}
