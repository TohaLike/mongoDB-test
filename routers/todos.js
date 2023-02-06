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
        console.log('fg')   
        res.redirect('/rename')
    }

    if (buttons === 'save') {
        todo.complited = false;
        await todo.save()
        res.redirect('/')
    }
});

router.post('/uncomplete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    let buttons = req.body.simplebtn;

    if (buttons === 'remove') {
        await todo.remove()
        res.redirect('/')
    }

    if (buttons === 'rename') {
        console.log('fg')   
        res.redirect('/rename')
    }

    if (buttons === 'save') {
        todo.complited = true;
        await todo.save()
        res.redirect('/')
    }
});

router.post('/rename', async (req, res) => {
    const todorename = new renameTodo ({
        firstName: req.body.renameFirstName,
        lastName: req.body.renameLastName,
        email: req.body.renameEmail,
        mobilePhone: req.body.renameMobilePhone
    })

    let buttons = req.body.simplebtn;

    if (buttons === 'back') {
        // console.log(todorename)
        // await Todo.replaceOne()
        res.redirect('/')
    } else {
        console.log('!')
        res.redirect('/')
    }
})

module.exports = router

