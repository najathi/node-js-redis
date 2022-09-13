const express = require("express")
const router = express.Router()

const { getTodos, getTodoById } = require('../controllers/todo')

router.get("/", getTodos)
router.get("/:id", getTodoById)

module.exports = router