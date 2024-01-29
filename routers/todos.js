const {Router} = require('express')
const Todo = require('../models/Todo')
const Projects = require('../models/Projects')
const router = Router()



// For create employee
router.get('/', async (req, res) => {
    const todos = await Todo.find().lean();
    
    res.render('index', {
        title: 'Сотрудники', 
        isIndex: true,
        isRename: true,
        todos
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Добавить сотрудника',
        isCreate: true
    });
});




// For rename employee ----------------
router.get('/rename', async (req, res) => {
    const rename = await Todo.find({edit: true}).lean()

    res.render('rename', {
        title: 'Редактирование',
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
        mobilePhone: req.body.mobilePhone,
        employeeId: req.body.employeeId,
        projectId: req.body.projectId,
        taskId: req.body.taskId
    });

    const updateId = await Projects.findOne({projectId: todo.projectId})

    if(updateId) {
        await updateId.updateOne({ $inc: { team: 1 }})
    }

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
    const buttons = req.body.simplebtn;

    if (buttons === 'delete') {
        await Todo.deleteMany({complited: true});   
        res.redirect('/')
    }

    if (buttons === 'remove') {
        res.redirect('/')
    } 
    
    if (buttons === 'rename') {
        res.redirect('/')
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
    const updateId = await Projects.findOne({projectId: todo.projectId})

    if (buttons === 'remove') {
        if(updateId) {
            await updateId.updateOne({ $inc: { team: -1 }})
        }
        await todo.remove()
        res.redirect('/')
    }

    if (buttons === 'add') {
        res.redirect('/create')
    }

    if (rename.length === 1) {
        buttons === 'renmae'
        res.redirect('/')
    } else if (buttons === 'rename') {
        todo.edit = true
        await updateId.updateOne({ $inc: {team: -1} })
        await todo.save()
        res.redirect('/rename')
    }
    
    if (buttons === 'save') {
        todo.complited = true
        await todo.save()
        res.redirect('/')
    }

})



// Rename page was created to rename form -------------------------
router.post('/rename', async (req, res) => {
    const rename = await Todo.find({edit: true})
    const renameTodo = { 
        edit: false, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        mobilePhone: req.body.mobilePhone,
        employeeId: req.body.employeeId,
        projectId: req.body.projectId,
        taskId: req.body.taskId
    }

    const updateId = await Projects.findOne({ projectId: renameTodo.projectId })

    if (updateId) {
        await updateId.updateOne({ $inc: {team: 1} })
    }

    await Todo.findOneAndUpdate({ edit: true }, renameTodo)

    if (rename.length === 1) {
        res.redirect('/') 
    } else {
        res.redirect('/rename') 
    }
})



module.exports = router

