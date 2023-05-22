const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routers/todos');
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

app.use(todoRoutes);


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

        app.listen(PORT, () => {
            console.log('Server has been started...');
            // console.log(collectionTwo);
        });

    } catch (e) {
        console.log(e)
    };
};

start();
