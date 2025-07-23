import { addAlbum, listAlbum, removeAlbum } from "../controller/albumController.js";
import express from "express";
import upload from "../middleware/multer.js";

const albumRouter = express.Router();

// Add a new album (cover image only)
albumRouter.post("/add", upload.single('image'), addAlbum);
// List all albums
albumRouter.get("/list", listAlbum);
// Remove an album by ID
albumRouter.delete("/remove/:id", removeAlbum);

export default albumRouter;