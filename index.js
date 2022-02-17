// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password,
// age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на
// сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.use(express.json()); //.use() settings before move on to the endpoint
app.use(express.urlencoded({extended: true}));

const users = [
    {
        name: "Mykola",
        city: 'Lviv'
    },
    {
        name: "Mykola",
        city: 'Lviv'
    },
    {
        name: "Mykola",
        city: 'Lviv'
    }
]

app.get('/test', (req, res) => {
    // res.write('Hello from server! method GET');
    // res.end(); //'cause server starts process response
    res.json(users);
});

app.post('/send', (req, res) => {
    // req - WHAT CLIENT SEND TO SERVER, res - WHAT CLIENT GET FROM SERVER
    console.log(req.body);
    res.json(`Hello my name is ${req.body.name}`);
})

app.listen('5200', () => {
    console.log(('Server 5200 has started'));
})