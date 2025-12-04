import express from "express";
import NotesController from "../controllers/notes-controller.js";

const NotesRouter = express.Router();

NotesRouter.get("/", NotesController.getAllNotes)
  .get("/:id", NotesController.getNoteById)
  .put("/:id", NotesController.updateExistingNote)
  .delete("/:id", NotesController.deleteNote)
  .post("/", NotesController.addNewNote);

export default NotesRouter;
