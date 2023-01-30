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

let saveEmployee = [];

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
    
    let buttons = req.body.simplebtn;
    


    if (buttons === 'delete') {
        
        // console.log('trueUser')
        await Todo.deleteMany({complited: true});   
        res.redirect('/')
    }

    if (buttons === 'save') {
        todo.complited = false;
        // console.log(todos)
        await todo.save()
        res.redirect('/')
    }
});


router.post('/uncomplete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    let buttons = req.body.simplebtn;

    if (buttons === 'save') {
        todo.complited = true;
        // console.log(todo)
        await todo.save()
        res.redirect('/')
    }
});


// router.post('/deleteelements', async (req, res) => {
//     const todo = await Todo.findById(req.body.id)
//     let buttons = req.body.simplebtn;
    
//     if (buttons === 'delete') {
//         console.log('!')
//         res.redirect('/')
//     }
// });



module.exports = router

