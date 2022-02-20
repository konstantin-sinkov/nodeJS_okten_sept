// Необхідно розширити ваше ДЗ:
// - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку
// цього
//
// * хто хоче складніше реалізуйте видалення користувача. Кнопка повинна знаходитись на сторінці з інфою про
// одного юзера. Після видалення редірект на "/users"

const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const {use} = require('express/lib/router');

const app = express();

app.use(express.json()); //app can get .json files
app.use(express.urlencoded({extended: true}));

//.hbs engine presets
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

let users = [];
let error = '';

// login routes
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', ({body}, res) => {
    if (users.some(user => user.email === body.email)) {
        error = 'This email is already used!'
        res.redirect('errorPage');
        return;
    }
    users.push({...body, id: users.length > 0 ? users.length + 1 : 1});
    res.redirect('/users');
})

//signIn routes
app.get('/signIn', (req, res) => {
    res.render('signIn.hbs');
})

app.post('/signIn', ({body}, res) => {
    let signedUser = {};
    if (users.some(user =>
        user.email === body.email &&
        user.password === body.password
    )) {
        signedUser = users.find(user =>
            user.email === body.email &&
            user.password === body.password
        );
        res.redirect(`/users/${signedUser.id}`);
        return;
    }
    error = 'Wrong email or password!'
    res.redirect('errorPage');
})


//users routes
app.get('/users', ({query}, res) => {
    if (!query.age && !query.city) {
        res.render('users', {users});
        return;
    }
    let filteredUsers = [];
    filteredUsers = users.filter(user =>
        user.age === query.age &&
        user.city === query.city
    );
    res.render('users', {users: filteredUsers});
})

app.get('/users/:id', ({params}, res) => {
    const {id} = params; //catch the id in req.params which we type in url
    res.render('user', {user: users[+id - 1]});
})

app.post('/users/:id', ({params}, res) => {
    const {id} = params;
    users = users.splice(id - 2, 1);
    res.redirect('/users');
})


//error route
app.get('/errorPage', (req, res) => {
    res.render('errorPage', {error});
})

//notFound route
app.use((req, res) => {
    res.render('notFound');
})

app.listen('5200', () => {
    console.log(('Server 5200 has started'));
})

