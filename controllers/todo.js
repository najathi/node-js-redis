const { getOrSetCache } = require('../util/redis-helper')

const getTodos = async (req, res) => {
    try {
        const todo = await getOrSetCache(`todos`, `https://jsonplaceholder.typicode.com/todos`);
        res.send(todo);
    } catch (error) {
        console.log(error)
    }
}

const getTodoById = async (req, res) => {
    const todoId = req.params.id;

    try {
        const todo = await getOrSetCache(`todos:${todoId}`, `https://jsonplaceholder.typicode.com/todos`);
        res.send(todo);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTodos,
    getTodoById
}