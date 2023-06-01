const {Router} = require('express')
const {remove, findById} = require('../models/Todo')
const Todo = require('../models/Todo')
const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')
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



// For create projects
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


// For create tasks 
router.get('/addTaskEmployee', async (req, res) => {

    res.render('addTaskEmployee', {
        title: 'Добавить задачу',
        isAddTaskEmployee: true
    })
})


router.get('/taskEmployee', async (req, res) => {
    const tasksEmployee = await Tasks.find().lean()

    res.render('taskEmployee', {
        title: 'Задачи',
        isTasksEmployee: true,
        isRenameTaskEmployee: true,
        tasksEmployee
    })
})


// For rename employee ----------------
router.get('/rename', async (req, res) => {
    const rename = await Todo.find({edit: true}).lean()

    res.render('rename', {
        title: 'Редактирование',
        rename
    })
})

// For rename projects ----------------
router.get('/renameTask', async (req, res) => {
    const projects = await Projects.find({edit: true}).lean()

        res.render('renameTask', {
            title: 'Редактирование',
            projects
        })
})

// For rename tasks ----------------
router.get('/renameTaskEmployee', async (req, res) => {
    const tasks = await Tasks.find({edit: true}).lean()

        res.render('renameTaskEmployee', {
            title: 'Редактирование',
            tasks
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
        projectId: req.body.projectId,
        employeeId: req.body.employeeId
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
        projectId: req.body.projectId,
        nameOfProject: req.body.nameOfProject,
        description: req.body.description,
        dataStarted: req.body.dataStarted,
        dataEndend: req.body.dataEndend,
        team: req.body.team,
        client: req.body.client
    });
    
    try { 
        await projects.save()
        res.redirect('/tasks')
    } catch (err) {
        console.log(err)
        res.redirect('/addTask')
    }
});



// the page for create tasks employee -------------------------
router.post('/addTaskEmployee', async (req, res) => {
    const tasksEmployee = new Tasks({
        employeeId: req.body.employeeId,
        tasksId: req.body.tasksId,
        projectId: req.body.projectId,
        email: req.body.email,
        taskEmployee: req.body.taskEmployee
    });
    
    try { 
        await tasksEmployee.save()
        res.redirect('/taskEmployee')
    } catch (err) {
        console.log(err)
        res.redirect('/addTaskEmployee')
    }
});



router.post('/uncompleteTaskEmployee', async (req, res) => {
    const tasksEmployee = await Tasks.findById(req.body.id)
    const renameTaskEmployee = await Projects.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'remove') {
        await tasksEmployee.remove()
        res.redirect('/taskEmployee')
    }

    if (renameTaskEmployee.length === 1) {
        !buttons === 'renameTask'
        tasksEmployee.edit = false
        res.redirect('/taskEmployee')
    } else {
        if (buttons === 'renameTask') {
            tasksEmployee.edit = true
            await tasksEmployee.save()
            res.redirect('/renameTaskEmployee')
        }
    }

    if (buttons === 'save') {
        tasksEmployee.complited = true
        await tasksEmployee.save()
        res.redirect('/taskEmployee')
    }
});



// Uncomplete employee ---------------
router.post('/completeTaskEmployee', async (req, res) => {
    const tasksEmployee = await Tasks.findById(req.body.id)
    const renameTaskEmployee = await Projects.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'remove') {
        await tasksEmployee.remove()
        res.redirect('/taskEmployee')
    }

    if (renameTaskEmployee.length === 1) {
        !buttons === 'renameTask'
        tasksEmployee.edit = false
        res.redirect('/taskEmployee')
    } else {
        if (buttons === 'renameTask') {
            tasksEmployee.edit = true
            await tasksEmployee.save()
            res.redirect('/renameTaskEmployee')
        }
    }

    if (buttons === 'save') {
        tasksEmployee.complited = false
        await tasksEmployee.save()
        res.redirect('/taskEmployee')
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


// Complete task ---------------
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
            projectId: req.body.projectId,
            employeeId: req.body.employeeId
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
            projectId: req.body.projectId,
            nameOfProject: req.body.nameOfProject,
            description: req.body.description,
            dataStarted: req.body.dataStarted,
            dataEndend: req.body.dataEndend,
            team: req.body.team,
            client: req.body.client
        }) 

    if (renameTask.length === 1) {
        res.redirect('/tasks') 
    } else {
        res.redirect('/renameTask') 
    }
})


// The renameTask page ---------------------------
router.post('/renameTaskEmployee', async (req, res) => {
    const renameTaskEmployee = await Tasks.find({edit: true})

    await Tasks.findOneAndUpdate(
        {
            edit: true
        }, 
        {
            edit: false,
            employeeId: req.body.employeeId,
            tasksId: req.body.tasksId,
            projectId: req.body.projectId,
            email: req.body.email,
            taskEmployee: req.body.taskEmployee
        }) 

    if (renameTaskEmployee.length === 1) {
        res.redirect('/taskEmployee') 
    } else {
        res.redirect('/renameTaskEmployee') 
    }
})



module.exports = router

