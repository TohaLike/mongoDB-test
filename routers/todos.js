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
        await todo.remove()
        res.redirect('/')
    } 
    
    if (buttons === 'save') {
        todo.complited = !!req.body.complited;
        await todo.save()
        res.redirect('/')
    }

    // if (buttons === 'deleteuser') {
    //     // todo.complited = true;
    //     await todo.remove()
    //     res.redirect('/')
    // } else {
    //     console.log('err')
    //     res.redirect('/')
    // }

});



router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    let buttons = req.body.deleteuserbtn;
    
    if (buttons === 'deleteuser') {
        todo.complited = true;
        await todo.remove()
        res.redirect('/')
    } else {
        console.log('err')
        res.redirect('/')
    }
})


module.exports = router

