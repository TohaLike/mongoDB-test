const {Router} = require('express')
const Tasks = require('../models/Tasks')
const taskRouter = Router()


// For create tasks 
taskRouter.get('/addTaskEmployee', async (req, res) => {

    res.render('addTaskEmployee', {
        title: 'Добавить задачу',
        isAddTaskEmployee: true
    })
})


taskRouter.get('/taskEmployee', async (req, res) => {
    const tasksEmployee = await Tasks.find().lean()

    res.render('taskEmployee', {
        title: 'Задачи',
        isTasksEmployee: true,
        isRenameTaskEmployee: true,
        tasksEmployee
    })
})


// For rename tasks ----------------
taskRouter.get('/renameTaskEmployee', async (req, res) => {
    const tasks = await Tasks.find({edit: true}).lean()

        res.render('renameTaskEmployee', {
            title: 'Редактирование',
            tasks
        })
})




// the page for create tasks employee -------------------------
taskRouter.post('/addTaskEmployee', async (req, res) => {
    const tasksEmployee = new Tasks({
        employeeId: req.body.employeeId,
        tasksId: req.body.tasksId,
        projectId: req.body.projectId,
        email: req.body.email,
        taskEmployee: req.body.taskEmployee,
        deadline: req.body.deadline
    });
    
    try { 
        await tasksEmployee.save()
        res.redirect('/taskEmployee')
    } catch (err) {
        console.log(err)
        res.redirect('/addTaskEmployee')
    }
});


// Uncomplete employee ---------------
taskRouter.post('/completeTaskEmployee', async (req, res) => {
    const tasksEmployee = await Tasks.findById(req.body.id)
    const renameTaskEmployee = await Tasks.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'delete') {
        await Tasks.deleteMany({complited: true});   
        res.redirect('/taskEmployee')
    }

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


taskRouter.post('/uncompleteTaskEmployee', async (req, res) => {
    const tasksEmployee = await Tasks.findById(req.body.id)
    const renameTaskEmployee = await Tasks.find({edit: true})
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



// The renameTask page ---------------------------
taskRouter.post('/renameTaskEmployee', async (req, res) => {
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
            taskEmployee: req.body.taskEmployee,
            deadline: req.body.deadline
        }) 

    if (renameTaskEmployee.length === 1) {
        res.redirect('/taskEmployee') 
    } else {
        res.redirect('/renameTaskEmployee') 
    }
})





module.exports = taskRouter