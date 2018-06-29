var users = [{
    "id": 1,
    "first_name": "Nahuel",
    "last_name": "L",
    "bday": Date.parse('1988/9/21'),
    "dni": 123456789,
    "display": true
}, {
    "id": 2,
    "first_name": "Pablo",
    "last_name": "F",
    "bday": Date.parse('1985/2/23'),
    "dni": 123456789,
    "display": false
}, {
    "id": 3,
    "first_name": "Pablo",
    "last_name": "I",
    "bday": Date.parse('1992/4/10'),
    "dni": 123456789,
    "display": false
}, {
    "id": 4,
    "first_name": "Chris",
    "last_name": "P",
    "bday": Date.parse('1994/2/1'),
    "display": true
}, {
    "id": 5,
    "first_name": "Flor",
    "last_name": "S",
    "bday": Date.parse('1991/3/2'),
    "dni": 123456789,
    "display": true
}];

for (var i = 0, l = users.length; i < l; i++) {
    console.log(users[i]);
}

users.forEach(function(user) {
    if (user.first_name === 'Flor') {
        console.log(user)
    }
});

var user = users.find(function(user) {
    return user.first_name === 'Flor';
});

var disponibles = users.filter(function(user) {
    return user.display;
});

var useriosProcesados = users.sort(function(a, b) {
    return a.id > b.id ? -1 : 1;
}).filter(function(user) {
    return user.display;
}).map(function(user) {
    user.bday = new Date(user.bday);
    user.day = user.bday.getDate();
    user.fullName = user.first_name + ' ' + user.last_name;
    delete user.first_name;
    delete user.last_name;
    return user;
});