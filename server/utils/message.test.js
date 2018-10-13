const expect = require("expect");

const {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        const from = "Mike";
        const text = "Hello";

        const res = generateMessage(from, text);
        //expect(res.from).toBe(from);
        //expect(res.text).toBe(text);
        expect(res.createdAt).toBeA("string");
        expect(res).toInclude({
            from,
            text
        });
    });
});

describe("generateLocationMessage", () => {
    it("should generate correct message object", () => {
        const from = "Admin";
        const latitude = 1;
        const longitude = 1;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const res = generateLocationMessage(from, latitude, longitude);
        expect(res.createdAt).toBeA("string");
        expect(res.url).toBe(url);
        expect(res.from).toBe(from);
    });
});