const {Router} = require('express');
const todo = require('../models/Todo')
const router = Router();

router.get('/', async (req, res) => {
    

    res.render('index', {
        title: 'Todos List', 
        isIndex: true
    });
});


router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    });
});

module.exports = router

