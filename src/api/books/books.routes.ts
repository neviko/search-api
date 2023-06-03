import express from "express";
import { getBooks, addBook } from "./books.handler";
import { addBookValidator } from "./books.validators";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBookValidator(), addBook);

export { router as booksRouter }; // or ES6
