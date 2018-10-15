const {Users} = require("./users");
const expect = require("expect");

describe("Users", () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node Course"
        },{
            id: "2",
            name: "Jen",
            room: "React Course"
        },{
            id: "3",
            name: "Julie",
            room: "Node Course"
        }]
    });
    it("should add new user", () => {
        const users = new Users();
        const user = {
            id: "123",
            name: "Andrew",
            room: "The Office Fans"
        };
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    });

    it("should remove a user", () => {
        const oldLength = users.users.length;
        const removedUser = users.removeUser("1");
        expect(users.users.length).toBeLessThan(oldLength);
        const res = users.users.filter((user) => user.id === removedUser.id);
        expect(res.length).toBe(0);
    });

    it("should not remove user", () => {
        /*const oldLength = users.users.length;
        users.removeUser("1232");
        expect(users.users.length).toBe(oldLength);*/
        const removedUser = users.removeUser("123213");
        expect(removedUser).toBeA("undefined");
    });

    it("should find user", () => {
        const user = users.getUser("1");
        expect(user).toEqual(users.users[0]);
    });

    it("it should not find user", () => {
        const user = users.getUser("129329");
        expect(user).toBeA("undefined");
    });

    it("should return names for node course", () => {
        const userList = users.getUserList("Node Course");
        expect(userList).toEqual(["Mike", "Julie"]);
    });

    it("should return names for react course", () => {
        const userList = users.getUserList("React Course");
        expect(userList).toEqual(["Jen"]);
    });


});
