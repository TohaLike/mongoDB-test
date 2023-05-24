const {Router} = require('express')
const {remove, findById} = require('../models/Todo')
const Todo = require('../models/Todo')
const Projects = require('../models/Projects')
const router = Router()


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

router.get('/addTask', (req, res) => {
    res.render('addTask', {
        title: 'Добавить задачу',
        isAddTask: true
    });
});

router.get('/tasks', async (req, res) => {
    const projects = await Projects.find().lean()

    res.render('tasks', {
        title: 'Проекты',
        isTasks: true,
        isRenameTask: true,
        projects
    })
})

router.get('/rename', async (req, res) => {
    const rename = await Todo.find({edit: true}).lean()

    res.render('rename', {
        title: 'Редактирование',
        rename
    })
})

router.get('/renameTask', async (req, res) => {
    const projects = await Projects.find({edit: true}).lean()

        res.render('renameTask', {
            title: 'Редактирование',
            projects
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
        projectId: req.body.projectId
    });

    try { 
        await todo.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/create')
    }
});


// the page for create tasks -------------------------
router.post('/addTask', async (req, res) => {
    const projects = new Projects({
        nameOfProject: req.body.nameOfProject,
        description: req.body.description,
        dataStarted: req.body.dataStarted,
        dataEndend: req.body.dataEndend,
        team: req.body.team,
        client: req.body.client,
        projectId: req.body.projectId
    });
    
    try { 
        await projects.save()
        res.redirect('/tasks')
    } catch (err) {
        console.log(err)
        res.redirect('/addTask')
    }
});

// Uncomplete task ---------------
router.post('/uncompleteTask', async (req, res) => {
    const task = await Projects.findById(req.body.id)
    const renameTask = await Projects.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'remove') {
        await task.remove()
        res.redirect('/tasks')
    }

    if (renameTask.length === 1) {
        !buttons === 'renameTask'
        task.edit = false
        res.redirect('/')
    } else {
        if (buttons === 'renameTask') {
            task.edit = true
            await task.save()
            res.redirect('/renameTask')
        }
    }

    if (buttons === 'save') {
        task.complited = true
        await task.save()
        res.redirect('/tasks')
    }
});

router.post('/completeTask', async (req, res) => {
    const task = await Projects.findById(req.body.id)
    const renameTask = await Projects.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'remove') {
        await task.remove()
        res.redirect('/tasks')
    }

    if (renameTask.length === 1) {
        !buttons === 'renameTask'
        task.edit = false
        res.redirect('/')
    } else {
        if (buttons === 'renameTask') {
            task.edit = true
            await task.save()
            res.redirect('/renameTask')
        }
    }

    if (buttons === 'save') {
        task.complited = false
        await task.save()
        res.redirect('/tasks')
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
            mobilePhone: req.body.mobilePhone,
            projectId: req.body.projectId
        }) 

    if (rename.length === 1) {
        res.redirect('/') 
    } else {
        res.redirect('/rename') 
    }
})

// The renameTask page ---------------------------
router.post('/renameTask', async (req, res) => {
    const renameTask = await Projects.find({edit: true})

    await Projects.findOneAndUpdate(
        {
            edit: true
        }, 
        {
            edit: false,
            nameOfProject: req.body.nameOfProject,
            description: req.body.description,
            dataStarted: req.body.dataStarted,
            dataEndend: req.body.dataEndend,
            team: req.body.team,
            client: req.body.client,
            projectId: req.body.projectId
        }) 

    if (renameTask.length === 1) {
        res.redirect('/tasks') 
    } else {
        res.redirect('/renameTask') 
    }
})

module.exports = router

