const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const {use} = require("express/lib/router");

const app = express();

app.use(express.json()); //app can get .json files
app.use(express.urlencoded({extended: true}));

//.hbs engine presets
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password,
// age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на
// сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
let users = [];

app.get('/login', (req, res) => {
    res.render('login');
})

// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
app.get('/users', (req, res) => {
    if (!req.query.age && !req.query.city) {
        res.render('users', {users: users});
    } else {
        // console.log(req.query);
        let filteredUsers = [];
        filteredUsers = users.filter(user =>
            user.age === req.query.age &&
            user.city === req.query.city
        );
        res.render('users', {users: filteredUsers});
    }
})

app.post('/login', (req, res) => {
    if (users.some(user => user.email === req.body.email)) {
        res.redirect('notFound');
    } else {
        users.push({...req.body, id: users.length > 0 ? users.length + 1 : 1});
        // console.log(users);
        res.redirect('/users');
    }
})

// 3. /user/:id сторінка з інфою про одного юзера
app.get('/users/:id', (req, res) => {
    const {id} = req.params; //catch the id in req.params which we type in url
    // console.log(users);
    // console.log(req.params);
    res.render('user', {user: users[+id - 1]});
})

// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект
app.use((req, res) => {
  res.render('notFound');
})

app.listen('5200', () => {
    console.log(('Server 5200 has started'));
})

