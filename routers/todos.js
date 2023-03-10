const {Router} = require('express')
const {remove, findById} = require('../models/Todo')
const Todo = require('../models/Todo')
const router = Router()


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
    const rename = await Todo.find({edit: true}).lean()

        res.render('rename', {
            title: 'Rename',
            isRename: true,
            rename
        })
    
})

// Page for create form ----------------------
router.post('/create', async (req, res) => {
    const todo = new Todo({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        mobilePhone: req.body.mobilePhone
    });
    
    try { 
        await todo.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/create')
    }
});

// Form finished ------------------------------
router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    const rename = await Todo.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'delete') {
        await Todo.deleteMany({complited: true});   
        res.redirect('/')
    }

    if (buttons === 'remove') {
        await todo.remove()
        res.redirect('/')
    }

    if (rename.length === 1) {
        !buttons === 'renmae'
        todo.edit = false
        res.redirect('/')
    } else {
        if (buttons === 'rename') {
            todo.edit = true
            await todo.save()
            res.redirect('/rename')
        }
    }

    if (buttons === 'save') {
        todo.complited = false
        await todo.save()
        res.redirect('/')
    }
});


// Form unfinished ------------------------------
router.post('/uncomplete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    const rename = await Todo.find({edit: true})
    const buttons = req.body.simplebtn
    
    if (buttons === 'remove') {
        await todo.remove()
        res.redirect('/')
    }

    if (rename.length === 1) {
        !buttons === 'renmae'
        res.redirect('/')
    } else {
        if (buttons === 'rename') {
            todo.edit = true
            await todo.save()
            res.redirect('/rename')
        }
    }

    if (buttons === 'save') {
        todo.complited = true;
        await todo.save()
        res.redirect('/')
    }
})

// Rename page was created to rename form -------------------------
router.post('/rename', async (req, res) => {
    const rename = await Todo.find({edit: true})

    await Todo.findOneAndUpdate(
        {
            edit: true
        }, 
        {
            edit: false, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            jobTitle: req.body.jobTitle,
            email: req.body.email,
            mobilePhone: req.body.mobilePhone
        }) 

    if (rename.length === 1) {
        res.redirect('/') 
    } else {
        res.redirect('/rename') 
    }
})

module.exports = router

