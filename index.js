const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routers/todos');
const projectRoutes = require('./routers/projects');
const tasksRoutes = require('./routers/tasks');
const cookieParser = require('cookie-parser');


const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(todoRoutes);
app.use(projectRoutes);
app.use(tasksRoutes);

app.use((req, res, next) => {
    const currentPosition = req.query.scrollPosition || 0; // Получите текущую позицию прокрутки из параметра запроса (если используется AJAX) или установите значение по умолчанию.
    res.cookie('scrollPosition', currentPosition, { httpOnly: true });
    next();
});

async function start() {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect('mongodb+srv://AntonM:554431@cluster0.q9ecejt.mongodb.net/test', 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true            
        });

        const db = mongoose.connection;

        const collectionOne = db.collection('projects');
        const collectionTwo = db.collection('todos');
        const collectionThree = db.collection('tasksEmployee');

        app.listen(PORT, () => {
            console.log('Server has been started...');
            // console.log(collectionTwo);
        });

    } catch (e) {
        console.log(e)
    };
};

start();
