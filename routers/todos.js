const {Router} = require('express');
const {remove, findById} = require('../models/Todo');
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

router.get('/rename', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    res.render('rename', {
        title: 'Rename',
        isRename: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobilePhone: req.body.mobilePhone
    });
    
    try { 
        await todo.save()
        res.redirect('/');
    } catch (err) {
        console.log(err)
        res.redirect('/create');
    }
});

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    const buttons = req.body.simplebtn;
    
    if (buttons === 'delete') {
        await Todo.deleteMany({complited: true});   
        res.redirect('/')
    }

    if (buttons === 'remove') {
        await todo.remove()
        res.redirect('/')
    }

    if (buttons === 'rename') {
        window.onunload(alert())
        res.end('/rename')
    }

    if (buttons === 'save') {
        todo.complited = false
        await todo.save()
        res.redirect('/')
    }
});


// 
router.post('/uncomplete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    let buttons = req.body.simplebtn

    if (buttons === 'remove') {
        await todo.remove()
        res.redirect('/')
    }

    if (buttons === 'rename') {
        todo.edit = true
        // console.log(todo)
        await todo.save()
        res.redirect('/rename')
    }

    if (buttons === 'save') {
        todo.complited = true;
        await todo.save()
        res.redirect('/')
    }
})



router.post('/rename', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    let buttons = req.body.simplebtn

    if (buttons === 'back') {
        await Todo.findOneAndUpdate(
            {
                edit: true
            }, 
            {
                edit: false, 
                firstName: req.body.firstName, 
                lastName: req.body.lastName,
                email: req.body.email,
                mobilePhone: req.body.mobilePhone
            })

        res.redirect('/')
    }
})

module.exports = router

