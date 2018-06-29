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
    "display": true
}, {
    "id": 3,
    "first_name": "Pablo",
    "last_name": "I",
    "bday": Date.parse('1992/4/10'),
    "dni": 123456789,
    "display": true
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
var users2 = [{
    "id": 6,
    "first_name": "Santi",
    "last_name": "H",
    "bday": Date.parse('1988/9/21'),
    "dni": 123456789,
    "display": true
}, {
    "id": 7,
    "first_name": "Trini",
    "last_name": "F",
    "bday": Date.parse('1985/2/23'),
    "dni": 123456789,
    "display": false
}, {
    "id": 8,
    "first_name": "Belu",
    "last_name": "I",
    "bday": Date.parse('1992/4/10'),
    "dni": 123456789,
    "display": true
}, {
    "id": 9,
    "first_name": "Marianela",
    "last_name": "P",
    "bday": Date.parse('1994/2/1'),
    "display": true
}, {
    "id": 9,
    "first_name": "JUAN",
    "last_name": "S",
    "bday": Date.parse('1991/3/2'),
    "dni": 123456789,
    "display": false
}];

users = users.concat(users2);

// LODASH // underscore;

_.map(users, function(user) {
    user.first_name = _.lowerFirst(user.first_name);
    return user;
})
_.unionBy(_.concat(users, users2), 'id');
_.sortBy(_.concat(users, users2), 'first_name');