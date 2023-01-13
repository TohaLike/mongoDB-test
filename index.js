const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routers/todos');


const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(todoRoutes);



async function start() {
    try {
        await mongoose.connect('mongodb+srv://AntonM:554431@cluster0.q9ecejt.mongodb.net/?retryWrites=true&w=majority', 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true
            });

        app.listen(PORT, () => {
            console.log('Server has been started...');
        });

    } catch (e) {
        console.log(e)
    };
};

start();

// console.log('Hello world')