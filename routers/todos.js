const {Router} = require('express');
const { remove, findById} = require('../models/Todo');
const Todo = require('../models/Todo');
const router = Router();


router.get('/', async (req, res) => {
    const todos = await Todo.find().lean();
    
    res.render('index', {
        title: 'Todos List', 
        isIndex: true,
        todos
    });
});


router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    });
});

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });
    await todo.save();
    res.redirect('/');
});



router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.complited = !!req.body.complited;
    await todo.save()

    res.redirect('/')
});



module.exports = router

