// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
const fs = require('fs');
const path = require('path');

// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами
// user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers,
// другий - inPersonUsers;
const onlineUsers = [
    {name: "Andrii", age: 22, city: "Lviv"},
    {name: "Margo", age: 35, city: "Lutsk"},
    {name: "Panas", age: 19, city: "Rivne"}
];

const inPersonUsers = [
    {name: "Inna", age: 22, city: "Polonne"},
    {name: "Olga", age: 35, city: "Bahmatcsh"},
    {name: "Mykola", age: 19, city: "Brovary"}
];

const onlinePath = path.join('main', 'online');
const inPersonPath = path.join('main', 'inPerson');

// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
//     але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

const dirsAndFilesCreating = () => {
    fs.mkdir(path.join(__dirname, 'main'), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        
        fs.mkdir(path.join(__dirname, 'main', 'online'), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            for (let i = 0; i < onlineUsers.length; i++) {
                for (const key in onlineUsers[i]) {
                    fs.writeFile(
                        path.join(__dirname, onlinePath, `${onlineUsers[i].name}.txt`),
                        `${key}: ${onlineUsers[i][key]}\n`,
                        {flag: "a"},
                        err => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        }
                    )
                }
            }
        });
        fs.mkdir(path.join(__dirname, 'main', 'inPerson'), err => {
            if (err) {
                console.log(err);
                throw err;
            }
            for (let i = 0; i < inPersonUsers.length; i++) {
                for (let key in inPersonUsers[i]) {
                    fs.writeFile(
                        path.join(__dirname, inPersonPath, `${inPersonUsers[i].name}.txt`),
                        `${key}: ${inPersonUsers[i][key]}\n`,
                        {flag: "a"},
                        err => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        }
                    );
                }
            }
        });
    });
}

// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що
// були в папці inPerson будуть в папці online)

const filesReplacing = () => {
    for (let i = 0; i < onlineUsers.length; i++) {
        fs.rename(
            path.join(__dirname, onlinePath, `${onlineUsers[i].name}.txt`),
            path.join(__dirname, inPersonPath, `${onlineUsers[i].name}.txt`),
            err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                fs.rename(
                    path.join(__dirname, inPersonPath, `${inPersonUsers[i].name}.txt`),
                    path.join(__dirname, onlinePath, `${inPersonUsers[i].name}.txt`),
                    err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    }
                );
            })
    }
}

dirsAndFilesCreating(); //first execute this f() and comment it after
// filesReplacing(); //then uncomment this f() and execute file again


// const init = () => {
//     return new Promise((resolve, reject) => {
//         dirsAndFilesCreating();
//     })
// }

// init().then(filesReplacing).catch(err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })