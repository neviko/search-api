import express from "express";
import { getBooks, addBook } from "./books.handler";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);

export { router as booksRouter }; // or ES6
