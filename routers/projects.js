const {Router} = require('express')
const Projects = require('../models/Projects')
const projectRouter = Router()


// For create projects
projectRouter.get('/addTask', (req, res) => {
    res.render('addTask', {
        title: 'Добавить задачу',
        isAddTask: true
    });
});

projectRouter.get('/tasks', async (req, res) => {
    const projects = await Projects.find().lean()

    res.render('tasks', {
        title: 'Проекты',
        isTasks: true,
        isRenameTask: true,
        projects
    })
})

// For rename projects ----------------
projectRouter.get('/renameTask', async (req, res) => {
    const projects = await Projects.find({edit: true}).lean()

        res.render('renameTask', {
            title: 'Редактирование',
            projects
        })
})


// the page for create tasks -------------------------
projectRouter.post('/addTask', async (req, res) => {
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


// Uncomplete task ---------------
projectRouter.post('/uncompleteTask', async (req, res) => {
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
projectRouter.post('/completeTask', async (req, res) => {
    const task = await Projects.findById(req.body.id)
    const renameTask = await Projects.find({edit: true})
    const buttons = req.body.simplebtn;

    if (buttons === 'delete') {
        await Projects.deleteMany({complited: true});   
        res.redirect('/tasks')
    }

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


// The renameTask page ---------------------------
projectRouter.post('/renameTask', async (req, res) => {
    const renameTask = await Projects.find({edit: true})
    const projectId = await Projects.findOne({projectId: req.body.projectId})

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

        console.log(projectId)

    if (renameTask.length === 1) {
        res.redirect('/tasks') 
    } else {
        res.redirect('/renameTask') 
    }
})


module.exports = projectRouter