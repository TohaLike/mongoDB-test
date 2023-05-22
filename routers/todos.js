const {Router} = require('express')
const {remove, findById} = require('../models/Todo')
const Todo = require('../models/Todo')
const router = Router()


router.get('/', async (req, res) => {
    const todos = await Todo.find().lean();
    
    res.render('index', {
        title: 'Сотрудники', 
        isIndex: true,
        todos
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Добавить сотрудника',
        isCreate: true
    });
});

router.get('/rename', async (req, res) => {
    const rename = await Todo.find({edit: true}).lean()

        res.render('rename', {
            title: 'Редактирование',
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
    let buttons = req.body.simplebtn;
    
    if (buttons === 'delete') {
        await Todo.deleteMany({complited: true});   
        res.redirect('/')
    }

    if (buttons === 'remove') {
        await todo.remove()
        res.redirect('/')
    } else if (buttons === 'save') {
        todo.complited = !!req.body.complited;
        await todo.save()
        res.redirect('/')
    }

});




module.exports = router

