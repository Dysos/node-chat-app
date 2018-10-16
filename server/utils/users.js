const uuid = require("uuid/v4");


class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.rooms = [];
        this.currentRoom = "";
        this.uuid = uuid();
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    changeRoom(room) {
        this.currentRoom = room;
    }
}

class Room {
    constructor(name) {
        this.name = name.toLowerCase();
    }  
}

class Rooms {
    constructor() {
        this.rooms = [];
    }
    addRoom(name) {
        const lowerCaseName = name.toLowerCase();
        const room = this.rooms.find((room) => {
            return room.name === lowerCaseName;
        });
        if(!room) {
            const room = new Room(name);
            this.rooms.push(room);
            console.log("All rooms: ", this.rooms);
            return true;
        }
        return false;
    }
    getRoomList() {
        return this.rooms;
    }
    /*
    addUserToRoom(id, roomName) {
        this.rooms.forEach((room) => {
            if(room.name === roomName) {
                room.users.push()
            }
        })
    }*/
}

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id,name) {
       /* const user = {id, name, room};
        this.users.push(user);
        return user;*/
        this.users.push(new User(id,name));
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
            return user.currentRoom === room;
        });
        const namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }

    addUserToRoom(id, roomName) {
        const user = this.users.find((user) => user.id === id);
        user.addRoom({
            name: roomName.toLowerCase()
        });
    }

    changeCurrentRoom(id, roomName) {
        const user = this.users.find((user) => user.id === id);
        user.changeRoom(roomName.toLowerCase());
        console.log(roomName);
        console.log(user);
    }
}


module.exports = {Users, Rooms};
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