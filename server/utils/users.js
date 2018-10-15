[{
    id:"aiwjdaiwjdio",
    name: "Andrew",
    room: "The Office Fans"
}]

//adduser(id,name,room)

//removeuser(id)

//getuser(id)

//getuserlist(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id,name,room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        const removedUser = this.users.find((user) => user.id === id);
        this.users = this.users.filter((user) => {
            return user.id != id;
        });
        return removedUser;
    }
    getUser(id) {
        return this.users.find((user) => user.id === id);
    }
    getUserList(room) {
        let users = this.users.filter((user) => {
            return user.room === room;
        });
        const namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};
/*
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    getUserDescription() {
        return `${this.name} is ${this.age} year(s) old`
    }
};

var me = new Person("Andrew", 25);
const description = me.getUserDescription();
console.log(description);*/